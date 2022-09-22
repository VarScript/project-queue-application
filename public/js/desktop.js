// Referencs HTML

const lblDesktop  = document.querySelector('h1');
const btnServe    = document.querySelector('button');
const divAlert    = document.querySelector('.alert');
const lblTicket   = document.querySelector('small');
const lblPendings = document.querySelector('h1#lblPendings')



const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desktop') ) {
    window.location = 'index.html'
    throw new Error('The desktop is required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none'; 


const socket = io();

socket.on('connect', () => {
    btnServe.disabled = false;
});

socket.on('disconnect', () => {
    btnServe.disabled = true;
});

socket.on('pending-tickets', ( pending ) => {
    if ( pending === 0) {
        lblPendings.style.display = 'none';
    } else {
        lblPendings.style.display = '';
        lblPendings.innerText = pending;
    }
});


btnServe.addEventListener( 'click', () => {

    socket.emit( 'serve-ticket', { desktop }, ( {ok, ticket, msg} ) => {
        if ( !ok ) {
            lblTicket.innerText = `There is no more ticket for serve`
            return divAlert.style.display = '';
        } 

        lblTicket.innerText = `Ticket ${ticket.number} `
        
    });   

        // socket.emit( 'next-ticket', null, ( ticket ) => {
        //     lblNewTicket.innerText = ticket;
        // });
});

