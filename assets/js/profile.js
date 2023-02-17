
function addFriend(t)
{
   let id = $(t).attr("user-id");
   
   $.ajax({
      type: 'get',
      url: `/friends/toogle/${id}`,
      success: function(data){
         flashMessages({success:data.message});
         if(data.friend)
         {
            $(t).attr("value","Unfriend"); 
         }
         else  $(t).attr("value","Add Friend");            
      },
      error:function(err)
      {
         flashMessages({error:"Error..!"});
         console.log(err);
      }
   })

} 