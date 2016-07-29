import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd} from "./../actions/index";

import Axios from 'axios';
import Viewer from "./viewer";

class Editors extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickSend = this.onClickSend.bind(this);
        this.renderEditors = this.renderEditors.bind(this);
    }

    onClickSend(e){

        const editor = $(e.currentTarget).closest(".editor");
        const action =  editor.find(".bar .select-action").val();
        const url =  editor.find(".bar .input-url").val();
        const jsonViewer = editor.find(".json-renderer");

        jsonViewer.html("Carregando....");

        Axios({
            method: action,
            url: url
        }).then(function(response) {
            jsonViewer.jsonViewer(response);
        })
        .catch(function(error) {
            jsonViewer.jsonViewer(error);
        });
    }

    renderEditors(data,index){
        return (
            <li className="editor" key={"editor-" + data.name}>
                <div className="top">
                    <div className="bar">
                        <div className="columm action">
                            <div className="select">
                                <select className="select-action">
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="PATCH">PATCH</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                        </div>
                        <div className="columm url">
                            <input className="input-url" name="url" placeholder="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" defaultValue="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" />
                        </div>
                        <div className="columm button">
                            <input className="input-button" onClick={this.onClickSend} type="button" name="send" defaultValue="Send" />
                        </div>
                    </div>
                </div>
                <Viewer />
            </li>
        )
    }

    render() {
        return (
            <div className="component-editors">
                <ul className="list">
                    {this.props.tabs.map(this.renderEditors)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({tabs}){
    return {tabs};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({tabAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Editors);
