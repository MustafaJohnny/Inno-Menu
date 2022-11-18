import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const OwnerLogoName = () => {
  const params = useParams();
  const URL = `${process.env.REACT_APP_URL}/api/v1/client/fileimage/${params.domain}`;
  const ownerName = useSelector((state) => state.controler.owner_name);
  const ownerLogo = useSelector((state) => state.controler.owner_logo);
  const mainStyle = useSelector(
    (state) => state.controlerStyles.side_nav_style
  );
  
  return (
    <div className={mainStyle.ownerLogoContainer}>
      <div
        className={mainStyle.logoImg}
        style={{
          backgroundImage: `url("${URL}/${ownerLogo}")`,
        }}
      ></div>
      <span className={mainStyle.textLogo}>{ownerName}</span>
    </div>
  );
};

export default OwnerLogoName;