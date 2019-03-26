const uuid = require( 'uuid/v4' );

async function saveMessage(db, payload) {
    const { message, userId, channelId, timestamp } = payload;
    const contentQuery = {
        text: 'INSERT INTO "content" VALUES($1, $2) ON CONFLICT DO NOTHING',
        values: [ message, message.length ],
    };
    const messageQuery = {
        text: 'INSERT INTO messages VALUES($1, $2, NULL, $3, NULL, $4, $5)',
        values: [ `T${uuid()}`, timestamp, userId, channelId, message ]
    };
    try {
        await db.query( contentQuery );
        await db.query( messageQuery );
    }
    catch (err) {
        logError( err );
    }
}

async function sendCurrentChannelMessages(db, currentChannelId) {
    const query = {
        text: 'SELECT * FROM messages WHERE channelid = $1',
        values: [ currentChannelId ]
    };
    try {
        const response = await db.query( query );
        return response.rows.map( ({ sentat, pinnedby, userid, isreplytotextid, channelid, content }) => ( {
                timestamp: sentat,
                pinnedby,
                userId: userid,
                isreplytotextid,
                channelId: channelid,
                message: content
            }
        ) );
    } catch (err) {
        logError( err );
    }
}

async function getUserInfo(db, username) {
    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [ username ]
    };
    try {
        const response = await db.query( query );
        return response.rows.map( ({ userid }) => ( { id: userid } ) )[ 0 ];
    } catch (err) {
        logError( err );
    }
}

async function getInitialInfo(db) {
    const usersQuery = {
        text: 'SELECT u.userid AS id, fullname AS name, description, username, status,\n' +
            '\tCASE WHEN a.userid IS NOT NULL\n' +
            '\tTHEN true\n' +
            '\tELSE false\n' +
            '\tEND AS "isAdmin"\n' +
            '\tFROM users u LEFT JOIN ADMIN a ON u.userid = a.userid'
    };
    const channelsQuery = {
        text: 'SELECT * FROM channel'
    };
    try {
        const usersResponse = await db.query( usersQuery );
        const channelsResponse = await db.query( channelsQuery );

        const users = usersResponse.rows.map( ({ id, name, description, username, status, isAdmin }) => ( {
            id,
            name,
            description,
            username,
            isOnline: status === "active",
            isAdmin
        } ) );

        const channels = channelsResponse.rows.map( ({ channelid, channelname, description, ismanagedbyadminid }) => (
            {
                id: channelid,
                name: channelname,
                description,
                channelAdmin: ismanagedbyadminid
            }
        ) );
        return { users, channels };
    } catch (err) {
        logError( err );
    }
}

async function createNewChannel(db, { name, description, channelAdmin }) {
    const values = [ `C${uuid()}`, name, description, channelAdmin ];
    console.log( values );
    const query = {
        text: 'INSERT INTO channel VALUES($1, $2, $3, $4)',
        values
    };
    try {
        await db.query( query );
        return { id: values[ 0 ], name, description, channelAdmin };
    } catch (err) {
        logError( err );
    }
}

function logError(err) {
    console.log( 'Error while querying database!' );
    console.log( err );
}

module.exports = { saveMessage, sendCurrentChannelMessages, getUserInfo, getInitialInfo, createNewChannel };
