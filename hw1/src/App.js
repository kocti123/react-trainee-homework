import { useState } from 'react';

import UserInfoFrom from "./components/UserInfoForm/UserInfoForm";
import ShowUserInfo from "./components/ShowUserInfo/ShowUserInfo";

function App() {
  const [showForm, setShowForm] = useState(true);
  const [userInfo, setUserInfo] = useState();

  function showResult(userInfo) {
    setUserInfo(userInfo);
    setShowForm(false);
  }

  if (showForm) {
    return <UserInfoFrom onSubmit={showResult} />;
  } else {
    return <ShowUserInfo userInfo={userInfo} />
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showForm: true,
//       userInfo: undefined,
//     };
//     this.showResult = this.showResult.bind(this);
//   }

//   showResult(userInfo) {
//     this.setState(() => ({
//       showForm: false,
//       userInfo: userInfo,
//     }));
//   }

//   render() {
//     let app;
//     if (this.state.showForm) {
//       app = <UserInfoFrom onSubmit={this.showResult} />;
//     } else {
//       app = <ShowUserInfo userInfo={this.state.userInfo} />;
//     }

//     return <>{app}</>;
//   }
// }

export default App;
