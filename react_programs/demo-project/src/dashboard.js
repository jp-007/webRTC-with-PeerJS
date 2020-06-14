import React,{useState, useEffect, useContext}from 'react';
import ReactDOM from 'react-dom'
import Paper from '@material-ui/core/Paper';
import { Typography, ListItem, List, ListItemText, Chip, Button, TextField } from '@material-ui/core';
import './Dashboard.css'

import {CTX} from './Store'
import { green } from '@material-ui/core/colors';

export default function Dashboard(){

    const {allChats,sendChatAction,user}=React.useContext(CTX)
   
    //console.log({allChats})
    let flag=true
    const topics=Object.keys(allChats)
   
    const [activeTopic, changeACtiveTopic]=React.useState(topics[0])
    const [textValue, changeTextValue]=React.useState('')

 return (
        <div className="Root">
        <Paper style={{padding:'10px',backgroundColor:'#5cb85c '}}>
            <Typography variant="h5" component="h5">
                {activeTopic}
            </Typography>
            <div className="flex">
                    <div className="optionwindow">
                        <List>
                            {
                                topics.map(topic=>(
                                    <ListItem onClick={e=>changeACtiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic}>
                                        
                                        </ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                        
                    </div>

                    
                    <div className="chatwindow">
                        <List id="chat">
                            {
                                allChats[activeTopic].map(function(chat,i){
                                    if(flag){//chat.from==userLoggedIn
                                        flag=false
                                        return(
                                        
                                            <div className="flex" key={indexedDB}>
                                            <div className="chip" style={{ borderRadius:'0px 20px'}}><span>{chat.msg}</span></div>                                             </div>
                                        )
                                    }
                                    flag=true
                                    return(
                                        <div className="flex1" key={indexedDB}>
                                        <div className="chip"style={{ borderRadius:'20px 0px',backgroundColor:'#C0C0C0',color:'black'}}>{chat.msg} </div>
                                         </div>
                                    )
                                    
                            })
                            }
                        </List>
                    </div>
            </div>
           

            <div className="flex">
                    <TextField
                        id="standard-name"
                        label="send a message"
                        className="chatbox"
                        value={textValue}
                        onChange={e =>changeTextValue(e.target.value)}
                        InputProps={{
                            multiline: true,
                          }}
                        />

                    <Button variant='contained' 
                            color='primary' 
                            className="button"
                            onClick={()=>{
                                if(textValue){
                                    sendChatAction({from:user,msg:textValue,topic:activeTopic})
                                changeTextValue('')
                                }
                                
                                // ReactDOM.render(<div className="flex" key={indexedDB}>
                                //                     <Chip label={user +':'+ textValue} className="chipsMine"></Chip>
                                //                 </div>,document.getElementById('chat'))
                            }}>
                           
                         send
                    </Button>
            </div>
        </Paper>
        </div>
    )
}
