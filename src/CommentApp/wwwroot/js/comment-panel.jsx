///<reference path="../lib/jquery/dist/jquery.js" />

import React, { Component } from 'react';
import CommentGroup from './comment-group.jsx';


export default class CommentPanel extends Component {
    constructor(props) {
      super(props);

      //Initialze state and other variables
      this.state = {isResponsed: false, commentText: ''};
      this.handlePost = this.handlePost.bind(this);
      this.userName = '';
      this.loadData();

    }
   
    componentWillMount() {

      //Get userName
      let arr = /#\/([^/]+)\//.exec(location.hash);
      if(arr && arr.length >= 1) {
        this.userName = arr[1];
      }      
    }

    handlePost(text, parentId) {

      //Specify which is the correct parent to add new comment
      let updatedArray = this.commentData;      
      if(parentId) {
          var parent = this.commentData.find((comment) => comment.id == parentId);
          if(parent) {
            parent.replies = parent.replies || [];
            updatedArray = parent.replies;
          }
      }

      //Save data to DB
      this.updateData(this.userName, updatedArray, parentId, text);
    }

    loadData() {
      let _ref = this;
      $.getJSON("/Home/LoadData", function(data) {

        //Initialize data and refresh UI via setState method
        _ref.commentData = JSON.parse(data) || [];
        _ref.setState({isResponsed: true});

      });
    }
     
    updateData(from, data, parentId, message) {

      //Validate data before processing
      if(!message || !data || !from )
        return;

      let _ref = this;

      //Save to db
      $.ajax({
        url: "/Home/SaveData",
        type: "POST",
        data: `from=${from}&message=${message}&parentId=${parentId ||''}`,
        success: function(com){

          //Push to current data list
          data.push(com);

          //update state
          _ref.setState({commentText: message});
        }
      });
      
      
    }

    render() {    

      //We need to wait until data is loaded from server  
      if(!this.state.isResponsed)
      return <div>Loading...</div>;

      //We now can render UI when data is loaded
      return (
          <div>
            <h3>Welcome {this.userName} </h3>
            <CommentGroup comments = {this.commentData} handlePost = {this.handlePost} />
          </div>
        );
    }
}