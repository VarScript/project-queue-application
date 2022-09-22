// Referencs HTML

const lblDesktop = document.querySelector('h1');
const btnServe   = document.querySelector('button');



const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desktop') ) {
    window.location = 'index.html'
    throw new Error('The desktop is required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;



const socket = io();

socket.on('connect', () => {
    btnServe.disabled = false;
});

socket.on('disconnect', () => {
    btnServe.disabled = true;
});

socket.on('last-ticket', ( last ) => {
    // lblNewTicket.innerText = 'Ticket: ' + last;
});

btnServe.addEventListener( 'click', () => {
        // socket.emit( 'next-ticket', null, ( ticket ) => {
        //     lblNewTicket.innerText = ticket;
        // });
});

