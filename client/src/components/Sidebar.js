import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { socketAction, channelChanged } from "../actions";
import find from 'lodash/find';
import { store } from "../index";

const SidebarDiv = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const SidebarList = styled.ul`
  padding-left: 0px;
  list-style: none;
  width: 100%;
`;

const SidebarListItem = styled.li`
  padding: 2px;
  padding-left: 10px;
  &:hover {
    background: #3e313c;
  }
`;

const SidebarHeader = styled.div`padding-left: 10px;`;

const SlickHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const GreenCircle = styled.span`
  height: 6px;
  width: 6px;
  background-color: #38978d;
  border-radius: 50%;
  display: inline-block;
`;

const mapStateToProps = state => ( {
    users: state.users,
    channels: state.channels,
    currentUser: state.currentUser,
    currentChannel: state.currentChannel
} );
const mapDispatchToProps = { channelChanged: channelChanged };

const Bubble = ({ on }) => ( on ? <GreenCircle/> : '○' );

export class Sidebar extends Component {
    constructor(props) {
        super( props );
        const { users, currentUser = 'Anonymous', channels, currentChannel } = props;

        this.state = {
            users,
            currentUser,
            channels,
            currentChannel
        }
    }

    onChangeChannel = (newChannelId) => {
        const newChannel = find( this.state.channels, ({ id }) => id === newChannelId );
        this.props.channelChanged( this.state.currentChannel, newChannel );
    };

    renderChannels = ({ id, name }) => <SidebarListItem onClick={this.onChangeChannel.bind( this, id )}
                                                        key={`channel-${id}`}># {name}</SidebarListItem>;

    renderUsers = ({ id, name, isOnline }) => (
        <SidebarListItem key={`user-${id}`}>
            <Bubble on={isOnline}/> {name}
        </SidebarListItem>
    );

    render() {
        const {
            renderChannels,
            renderUsers,
            state: { users, currentUser, channels }
        } = this;

        return (
            <SidebarDiv>
                <SidebarHeader>
                    <SlickHeader>Slick</SlickHeader>
                    {currentUser.name}
                </SidebarHeader>
                <div>
                    <SidebarList>
                        <SidebarListItem>Channels</SidebarListItem>
                        {channels.map( renderChannels )}
                    </SidebarList>
                </div>
                <div>
                    <SidebarList>
                        <SidebarListItem>Direct Messages</SidebarListItem>
                        {users.map( renderUsers )}
                    </SidebarList>
                </div>
            </SidebarDiv>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Sidebar );
