import React from "react";
import teamData from "../utils/teamdata";
import "../index.css"

function NewMember(props) {
  return (
    <div style={{ padding: 0, margin: 100 }}>
      <div className="w3-cell-row">
        <div className="w3-cell w3-cell-top w3-cell-img w3-section">
          <div className="imageBox">
            <div className="memberImg">
              <img
                src={props.member.image}
                alt="member image"
                className="memberImg"
              />
            </div>
          </div>
        </div>
        <div className="w3-cell w3-cell-text w3-padding-0">
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
