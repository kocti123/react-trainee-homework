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

export default App;
