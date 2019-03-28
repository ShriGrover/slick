import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { viewingUserStatsSelector } from '../../selectors';

const UserStatsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100wh;
`;

const Wrapper = styled.section`
  height: 100vh;
  width: 100wh;
`;

const DisplayName = styled.h1`
  font-size: 2.5vw;
`;

const MetadataField = styled.div`
  font-size: 1.8vw;
`;

const StatsComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
`;

const MetadataFieldDescriptor = styled.span`
    color: #A9A9A9;
`;

const mapStateToProps = ({users, viewingUserId, viewingUserStats}) => {
        return ({
            viewingUser: viewingUserStatsSelector(users, viewingUserId),
            userStatistics: viewingUserStats
        })
};

class UserStats extends React.Component {

    render() {

        const {
            props: {
                userStatistics: {
                    mostactivechannel,
                    numChannels,
                    numAdminChannels,
                    sentMessages,
                    avgLengthMessagesSent,
                    usersMessagedAllChannels
                },
                viewingUser
            },
        } = this;

        return (
            <Wrapper>
                <UserStatsDiv>
                    <StatsComponent>
                <DisplayName>
                    <div>{viewingUser.name}'s Usage Stats</div>
                </DisplayName>
                <MetadataField>
                    Most active in this channel: {this.props.userStatistics.mostactivechannel}
                </MetadataField>
                <MetadataField>
                    Currently a member of {this.props.userStatistics.numChannels} channels
                </MetadataField>
                <MetadataField>
                    Currently an admin of {this.props.userStatistics.numAdminChannels} channels
                </MetadataField>
                <MetadataField>
                    Sent {this.props.userStatistics.sentMessages} messages
                </MetadataField>
                <MetadataField>
                    Avg. length of messages sent: {this.props.userStatistics.avgLengthMessagesSent}
                </MetadataField>
                    </StatsComponent>

                <div>
                    <img src="https://image.flaticon.com/icons/png/512/64/64572.png" height="24" width="24"/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link to={"/user"}>Go back to User Profile View</Link>
                </div>

                    <br></br>

                <div>
                    <img src="https://cdn3.iconfinder.com/data/icons/android-app-solid/128/16_Message-512.png" height="24" width="24"/>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link to={"/"}>Return to messages</Link>
                </div>
                <br></br>
                    <img src="https://cdn3.iconfinder.com/data/icons/stars-5/512/gold_star-512.png" height="24" width="24"/>

                    <MetadataFieldDescriptor>
                <FormattedFieldDisplay {... {
                        value: "",
                        message_prefix: "Slick Superstars (people who've messaged all the channels!):",
                        message_suffix: ""
                    }}>
                </FormattedFieldDisplay>
                    </MetadataFieldDescriptor>
                    <MetadataField>
                    {this.props.userStatistics.usersMessagedAllChannels}
                    </MetadataField>
                </UserStatsDiv>
            </Wrapper>
        );
    }
}


const FormattedFieldDisplay = ({value, message_prefix, message_suffix}) => (
    <MetadataField>
        {message_prefix} {value} {message_suffix}
    </MetadataField>
);



const userStatsConnected = connect( mapStateToProps )( UserStats );
export { userStatsConnected as UserStats };
