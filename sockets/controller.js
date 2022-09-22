const TicketControl = require('../models/ticket-control');



const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-status', ticketControl.last4);


    socket.on('next-ticket', ( payload, callback ) => { 
        const next = ticketControl.next();
        callback( next );   

        // Notify new ticket
    });

    socket.on( 'serve-ticket', ({ desktop }, callback) => {
        if( !desktop ){
            return callback({
                ok: false,
                msg: 'The desktop is required'
            });
        }

        const ticket = ticketControl.attendTicket( desktop );
        // Notify change in the last4
        socket.broadcast.emit('actual-status', ticketControl.last4);


        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Already there is not pending tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
}

module.exports = { 
    socketController,
}