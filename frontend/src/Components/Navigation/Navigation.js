import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../../img/rupees.jpeg'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../../context/globalContext'

function Navigation({ active, setActive ,totalBalance}) {
    const { getUsername, username, error } = useGlobalContext();

    useEffect(() => {
        getUsername();
    }, []);
    useEffect(() => {
        console.log("Username in component:", username);
    }, [username]);

   return (
        <NavStyled>
            <div className="user-con">
                <img src={logo} alt="" />
                <div className="text">
                    <h2>{username}</h2>
                <p>money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    <Link to="/login"> {signout} Sign Out</Link>
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 1.5rem;
    width: 370px;
    height: 100%;
    background-color: whitesmoke;
    border: 3px solid green;
    backdrop-filter: blur(4.5px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background-color: gainsboro;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 1px solid green;
            padding: .4rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.3);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.5rem;
                transition: all .4s ease-in-out;
                color: #b2b2b2;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        font-size:17px;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
    }
`;

export default Navigation