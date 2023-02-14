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
                    $(`#post-comments-${comment.post}`).prepend(card);
                    flashMessages({success:data.message});
                    deleteComment($('.delete-comment-a',card));
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
      return $(`<p id="comment-${comment._id}"> 
      <small> 
      <a class="delete-comment-a" href="/comment/destroy/${comment._id}">X</a>
      </small>
      <small>${comment.user.name}</small> 
      ${comment.content} 
      </p>`);
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
                    else obj.innerText = parseInt(obj.innerText) + 1;
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