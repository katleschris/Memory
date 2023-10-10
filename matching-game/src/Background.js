import './Background.css'
import React from "react";

export default function Background(){
    return(
        <>
        <div className="background">
            <div className="wrapper">
                <div className="cube">
                    <div className="top"></div>
                    <div>
                        <span style={{'--i': 0}}></span>
                        <span style={{'--i': 1}}></span>
                        <span style={{'--i': 2}}></span>
                        <span style={{'--i': 3}}></span>
                    </div>
                </div>
            </div>
            <div className="wrapper-2">
                <div className="cube">
                    <div className="top"></div>
                    <div>
                        <span style={{'--i': 0}}></span>
                        <span style={{'--i': 1}}></span>
                        <span style={{'--i': 2}}></span>
                        <span style={{'--i': 3}}></span>
                    </div>
                </div>
            </div>
            <div className="wrapper-3">
                <div className="cube">
                    <div className="top"></div>
                    <div>
                        <span style={{'--i': 0}}></span>
                        <span style={{'--i': 1}}></span>
                        <span style={{'--i': 2}}></span>
                        <span style={{'--i': 3}}></span>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
