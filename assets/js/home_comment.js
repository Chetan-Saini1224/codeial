{
let createComment = () => 
{    


    $(".create-comment-form").each((i,element) => {   
         $(element).submit((e) =>{
            e.preventDefault();//prevent from deafult form action submit.
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(e.target).serialize(), //data -> json
                success: (data) =>
                {
                    let {comment} = data.data;
                    let card = newDomComment(comment);
                    $(`#post-comments-${comment.post}`).append(card);
                    flashMessages({success:data.message});
                    deleteComment($('.delete-comment-a',card));
                    likeComment($('.like-comment',card));
                    $(".create-comment-form input[type=text]").val('');
                },
                error: (err) => {
                     console.log(err.responseText);
                     flashMessages({error:"Error..!"});
                }
               });
         })    
     }); 
}
   let newDomComment = function(comment)
   {
     return  $(`<div id="comment-${comment._id}" class="user-comment">

    <div class="comment-user-info" style="cursor: pointer;" onclick="redirectToUser('${comment.user._id}')">
        <img src="/images/user.png" alt="user" /></a>
        <p class="comment-user-name">
            ${comment.user.name }
        </p>
        </a>
    </div>
    
    <div class="comment-user-content">
        <p>
            ${ comment.content } 
        </p>
    </div>

    <div class="comments-actions">
        <a class="like-comment" href="likes/toogle?type=Comment&id=${comment._id}">
            <span class="comment-like-count">${comment.likes.length}</span>
            <img src="/images/Like.png" alt="like" /></a>
        </a>
        <a class="delete-comment" href="/comment/destroy/${comment.id}">
                <span>Remove</span>
        </a>
    </div>

     </div>`)
   }
    
let deleteComment = (deleteLink) =>{
   
    $(deleteLink).click(function(e) {
      e.preventDefault(); //we dont want the natural behaviour like go to href link
      
      $.ajax({
           type: 'get',
           url: $(deleteLink).prop('href'),
           success: function(data){
                $(`#comment-${data.data.comment_id}`).remove();
                flashMessages({success:data.message});
           },
           error:function(err)
           {
                flashMessages({error:"Error..!"});
                console.log(err);
           }
      })
    })
}

let likeComment = (likeLink) =>{
   
     $(likeLink).click(function(e) {
       e.preventDefault(); //we dont want the natural behaviour like go to href link
       
       $.ajax({
            type: 'get',
            url: $(likeLink).prop('href'),
            success: function(data){
               $('.comment-like-count',likeLink).each(function(i, obj) {
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


$(".delete-comment").each(function(i, obj) {
     deleteComment(obj);
 });

 $(".like-comment").each(function(i, obj) {
     likeComment(obj);
 });

 

    createComment();
}