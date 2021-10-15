import React from "react";

import styles from "./ShowUserInfo.module.css";

function ShowUserInfo(props) {
  const userInfo = props.userInfo;
  return (
    <div className={styles.userInfo}>
      <h1 className={styles.title}>
        {userInfo.firstName} {userInfo.lastName}
      </h1>
      <h3>Базовая информация:</h3>
      <ul>
        <li>
          Сайт:{" "}
          <a href={userInfo.userSite} target="_blank" rel="noreferrer">
            {userInfo.userSite}
          </a>
        </li>
        <li>Телефон: {userInfo.phoneNumber}</li>
        <li>Дата Рождения: {userInfo.dateBirth}</li>
      </ul>
      <h3>Подробно:</h3>
      <h4>О себе</h4>
      <p>{userInfo.userBio}</p>
      <h4>Стек технологий</h4>
      <p>{userInfo.userStack}</p>
      <h4>Описание последнего проекта</h4>
      <p>{userInfo.userProject}</p>
    </div>
  );
}

export default ShowUserInfo;
