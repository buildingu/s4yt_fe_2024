import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import s from "./styles.module.css";

interface Props {
    data:Array<String>,
}

const Instagram: React.FC<Props> = ({ data }) => {
    const ids = [];
    
    return (<section className={s.interactions}>
        <h2>Instagram<br /> Interactions</h2>
       	<table>
            <thead>
               	<tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index) => {
                    const coinDescriptionId = item.coin_description_id;

                    if(ids.indexOf(coinDescriptionId) === -1){
                        const date = new Date(item.created_at);
                        
                        ids.push(coinDescriptionId);
                       
                        return (<tr key={index}>
                            <td>
                                 8/24/2023
                            </td>
                            <td>
                                {item.description.text}
                            </td>
                            <td>
                                {data.filter(ele => ele.coin_description_id === coinDescriptionId).length}
                            </td>
                        </tr>)
                    }
                })}
            </tbody>
        </table>
    </section>)
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch: Function) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);