import styled from 'styled-components';
import { colors } from '../utils/colors';

/**
 * Component to out users list in chat
 * @param {object} args
 */
export const UsersList = ({ users, currentUsername }) => {
  return (
    <UsersListsWrapper>
      <UsersListTitle>Now online:</UsersListTitle>
      <ul>
        {users.map((user, i) => (
          <User key={i} currentUsername={currentUsername === user.username}>
            <UserIterator>{i + 1}</UserIterator>
            {' ' + user.username}
          </User>
        ))}
      </ul>
    </UsersListsWrapper>
  );
};

const UsersListsWrapper = styled.div`
  border-radius: 16px;
  border: 1px solid ${colors.$gray};
  padding: 16px;

  overflow: scroll;
`;

const UsersListTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.$purple};
  margin-bottom: 8px;
`;

const User = styled.li`
  color: ${(props) => props.currentUsername && colors.$red};
  font-size: 0.875rem;
  font-weight: 300;
  white-space: nowrap;
`;

const UserIterator = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: inherit;
`;
