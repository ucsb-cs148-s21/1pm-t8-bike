import React from "react";
import teamData from "../utils/teamdata";
import "../index.css"

function NewMember(props) {
  return (
    <div style={{ padding: 0, margin: 0 , float: 'left'}}>
      <div className="imageBox">
        <div className="memberImg">
          <img
            src={props.member.image}
            alt="member image"
            className="memberImg"
          />
        </div>
        <div>
            <h3 className="h3-member-name">{props.member.name}</h3>
            <p className="p-member-role">{props.member.role}</p>
            <p className="p-member-description">{props.member.description}</p>
        </div>   
      </div>
      <br />
    </div>
  );
}

export default function Members() {
  const teamList = teamData.map(item => (
    <NewMember key={item.id} member={item} />
  ));

  return (
    <div>
      <div className="paragraphText">{teamList}</div>
    </div>
    
  );
}
