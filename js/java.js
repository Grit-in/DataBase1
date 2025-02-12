var trenutniTelefon;
var ocena;
$(document).ready(async function () {
    var telefoni = await (await fetch("http://localhost:46738/telefon")).json()
    var model = new URLSearchParams(location.search);
    trenutniTelefon = telefoni.find(curr => curr.model == model.get("model"));
    $.each(telefoni, function (id, tel) {
        $("#telefon").append(`  

    <img src="${tel.phoneImage}" style="width:20%;">
                <a href="Telefoni2.html?model=${tel.model}">
                    <div style="color:#B0C4DE" class="bottom-left">${tel.model}</div> 
                <div style="color:#B0C4DE" class="bottom-left">${tel.cena}</div>  
                </a>
`)

    }
    )

    $("#specifikacije").append(`
   

<thead>
 <tr>
    <th>Prosecna Ocena</th>
    <th>Dijagonala ekrana</th>
    <th>RAM memorija</th>
    <th>Interna memorija</th>
    <th>Zadnja kamera</th>
    <th>Kapacitet baterije</th>
    <th>Rezolucija</th>
  </tr>
  </thead>

<tbody>
<tr>
<td>${(trenutniTelefon.ocene.length) ? Math.round(trenutniTelefon.ocene.reduce((first, second) => first + second) / trenutniTelefon.ocene.length * 100) / 100: 0}</td>
    <td>${trenutniTelefon.ekran}</td>


    <td>${trenutniTelefon.ram}</td>


    <td>${trenutniTelefon.rom}</td>


    <td>${trenutniTelefon.Zadnja_kamera}</td>

    <td>${trenutniTelefon.baterija}</td>

    <td>${trenutniTelefon.rezolucija}</td>
-+
</tbody>

</tr>

`)
    $("#fn").append(`
<img src="img/camera.png">
                        <div>
                            <h1>Camera</h1>
                            <p>${trenutniTelefon.Zadnja_kamera}</p>
                        </div>
`)
    $("#sn").append(`
<img src="img/processor.png">
                        <div>
                            <h1>Procesor</h1>
                            <p>${trenutniTelefon.procesor}</p>
                        </div>
`)
    $("#tn").append(`
<img src="img/display.png">
                        <div>
                            <h1>display</h1>
                            <p>${trenutniTelefon.ekran}</p>
                        </div
`)
    $("#cn").append(`
<img src="img/battery.png">
                        <div>
                            <h1>Battery</h1>
                            <p>${trenutniTelefon.baterija}</p>
                        </div>
`)
    $("#slikaTelefona").append(`
<img class="telefon" src="${trenutniTelefon.phoneImage}" style="width:200%;">
`)
    $("#iframe").append(`<iframe id="iframe" width="400" height="20" class="responsive-iframe border" src="${trenutniTelefon.iframe}" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`)
    $("title").append(`${trenutniTelefon.model}`)
    $.each(trenutniTelefon.komentari, function (id, comment) { renderComments(comment) })
})
const renderReply = (replies) => {
    let html = "";
    $.each(replies, function (id, reply) {
        html += `
      <div class='rightPanel'>
          <span>Username:${reply.name}
          <p>Odgovor:${reply.tekst}
      </div>`
    })
    return html
}
function renderComments(comment) {
    $("#comment").append(`

    <div class='commentBox'>
    <div class='leftPanelImg'>
    
    <img src='img/blank.png' width='50%'>
    </div><div class='rightPanel'>
    <span>Username:${comment.name}</span><p>Komentar:  ${comment.tekst} </p><div class='clear'></div><span>Ocena:${comment.ocena}</span></span><span><br>

    <input type='image' onclick = "rateComment('${comment._id}',${comment.likes},${comment.dislikes},${true})" value='like'src='img/like.png' width='4%'><div id = 'like-${comment._id}'>${comment.likes}</div><input type='image' onclick = "rateComment('${comment._id}',${comment.likes},${comment.dislikes},${false})" value='dislike' src='img/dislike.png' width='5%'><div id = 'dislike-${comment._id}'>${comment.dislikes}</div></span></div>
    <div class="form">
    <h2>Odgovori:</h2>
    Name: <input type="text" id="name-${comment._id}" required /><br /><br />
    Text: <textarea id="text-${comment._id}" required></textarea><br />
    <input type="button" onclick="reply('${comment._id}')" value="Add Reply">
    <div id="replies-${comment._id}">${renderReply(comment.replies)}<div>
</div>
</form>
`)
}
function sortlike(){
      $(`#comment`).html("")
      trenutniTelefon.komentari.sort((first,second)=> -(first.likes - second.likes))
      for(const komentar of trenutniTelefon.komentari){
        renderComments(komentar);
      }

}

function sortdislike(){
  $(`#comment`).html("")
  trenutniTelefon.komentari.sort((first,second)=> (first.likes - second.likes))
  for(const komentar of trenutniTelefon.komentari){
  renderComments(komentar);
}
}
async function reply(commentId) {
    let newReply = {
        name: $(`#name-${commentId}`).val(),
        tekst: $(`#text-${commentId}`).val()
    }
    $(`#replies-${commentId}`).append(renderReply([newReply]))
    await fetch(`http://localhost:46738/telefon/${commentId}/reply`, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReply)
    })
}
var ratedComments = [];
const rateComment = async (commentId, likes, dislikes, vote) => {
    let ratedComment = ratedComments.find(comment => comment.commentId == commentId);
    if (ratedComment != undefined) {
        if (ratedComment.vote == undefined || ratedComment.vote != vote) {
            ratedComment.vote = vote;
            if (vote) {
            
                $(`#like-${commentId}`).html(likes + 1);
                $(`#dislike-${commentId}`).html(dislikes);
                fetch(`http://localhost:46738/telefon/${commentId}/dislikerem`, { method: 'POST' });
                await fetch(`http://localhost:46738/telefon/${commentId}/likeadd`, { method: 'POST' });
            }
            else {
            
                $(`#dislike-${commentId}`).html(dislikes + 1);
                $(`#like-${commentId}`).html(likes);
                fetch(`http://localhost:46738/telefon/${commentId}/likerem`, { method: 'POST' });
                await fetch(`http://localhost:46738/telefon/${commentId}/dislikeadd`, { method: 'POST' });
            }
        } else {
            ratedComment.vote = undefined;
            if (vote) {
           
                $(`#like-${commentId}`).html(likes);
                await fetch(`http://localhost:46738/telefon/${commentId}/likerem`, { method: 'POST' });
            }
            else {
             
                $(`#dislike-${commentId}`).html(dislikes);
                await fetch(`http://localhost:46738/telefon/${commentId}/dislikerem`, { method: 'POST' });
            }
            return;
        }
    } else {
        ratedComments.push({ commentId, vote });
        if (vote) {
            $(`#like-${commentId}`).html(likes + 1);
            await fetch(`http://localhost:46738/telefon/${commentId}/likeadd`, { method: 'POST' });
        }
        else {
            $(`#dislike-${commentId}`).html(dislikes + 1);
            await fetch(`http://localhost:46738/telefon/${commentId}/dislikeadd`, { method: 'POST' });
        }
    }
}

function setOcena(o) {
    ocena = o;
}
async function addComment() {
    var newComment = {
        ocena,
        name: $("#name").val(),
        tekst: $("#bodyText").val()
    };
    await fetch(`http://localhost:46738/telefon/${trenutniTelefon._id}/komentar`, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    location.reaload();
};