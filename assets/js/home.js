{
function Comment_List(t)
{
     let id = t.getAttribute("data-id");
     document.getElementById(`post-comments-${id}`).classList.toggle("show-hide");
}

//serialize the data from an html <form id="new-post-form">
//$(‘#new-post-form’).serialize()
//var data = new FormData(document.getElementById(‘new-post-form’))

let createPost = () =>{
    let newPostForm = $("#new-post-form");
    
    newPostForm.submit((e)=>{
         e.preventDefault();
         $.ajax({
          type: 'post',
          url: '/posts/create',
          data: newPostForm.serialize(), //data -> json
          success: (data) =>{
               let newPost = newPostDom(data.data.post);
               $("#post-list").prepend(newPost);
               deletePost($('.delete-post-button',newPost)); // this class inside this newPost
               likePost($('.like-post',newPost));
               flashMessages({success:data.message});
          },
          error: (err) => {
               console.log(err.responseText);
               flashMessages({error:"Error..!"});
          }
         });
    });
}

//method to creae a post in DOM
let newPostDom = function(post){
     return $(`<div id="post-${post._id}" class="post">
  <div class="post-content">
    <div class="post-user">
      <a class="delete-post-button" href="/posts/destroy/${post._id}">
         <img src="/images/Delete_Post.jpg" alt="Delete_Icon"  />
      </a>
    <small>${post.user.name}</small> 
    </div>
    <div class="post-data">
      <p>
          ${post.content}
      </p>
    </div>
      <div class="post-actions">
          <a class="like-post" href="likes/toogle?type=Post&id=${post._id}"><span class="post-like-count">
              ${post.likes.length}
          </span> <img src="/images/Like.png" alt="like" /></a>
          <input type="button" data-id="${post._id}" onclick="Comment_List(this)" value="Comments" />
      </div>
  </div> 

  <div class="post-comments-list">
    <ul class="comment show-hide" id="post-comments-${post._id}">
          <div class="post-comments">
                  <form class="create-comment-form" action="/comment/create" method="post">
                    <input type="text" name="content" placeholder="Add Comment.." required />
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" value="Add" />
                  </form>
          </div>  
    </ul>
  </div>
</div>
`)
}


let deletePost = (deleteLink) =>{
   
   $(deleteLink).click(function(e) {
     e.preventDefault(); //we dont want the natural behaviour like go to href link
     
     $.ajax({
          type: 'get',
          url: $(deleteLink).prop('href'),
          success: function(data){
               $(`#post-${data.data.post_id}`).remove();
               flashMessages({success:data.message});
          },
          error:function(err){
               flashMessages({error:"Error..!"});
               console.log(err);
          }
     }) 
   })
}


let likePost = (likeLink) =>{
   
  $(likeLink).click(function(e) {
    e.preventDefault(); //we dont want the natural behaviour like go to href link
    
    $.ajax({
         type: 'get',
         url: $(likeLink).prop('href'),
         success: function(data){
            $('.post-like-count',likeLink).each(function(i, obj) {
                 if(data.deleted) obj.innerText = parseInt(obj.innerText) - 1;
                 else if(data.deleted == false) obj.innerText = parseInt(obj.innerText) + 1;
             });             
         },
         error:function(err)
         {
              flashMessages({error:"Error..!"});
              console.log(err);
         }
    })
  })
}





$(".like-post").each(function(i, obj) {
  likePost(obj);
});


$(".delete-post-button").each(function(i, obj) {
  deletePost(obj);
});

createPost();
}