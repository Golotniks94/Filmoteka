const openTeamModalLink = document.querySelector(".js-team-modal");
const modalTeam = document.querySelector("[data-team-modal]");
const closeModalTeamBtn = document.querySelector(".team-modal__close-btn")
console.log(openTeamModalLink);
console.log(modalTeam);
console.log(closeModalTeamBtn);
openTeamModalLink.addEventListener("click", openTeamModal);
closeModalTeamBtn.addEventListener("click", openTeamModal);

function openTeamModal (){
    console.log(openTeamModalLink);
    modalTeam.classList.toggle("is-hidden");
}