const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('init server')

bands.addBand( new Band( 'Mana'));
bands.addBand( new Band( 'Van Van'));
bands.addBand( new Band( 'El trabuco'));
bands.addBand( new Band( 'R Kelly'));
bands.addBand( new Band( 'Bruno Mars'));


  
//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () =>{
        console.log('Cliente desconectado');
    });

    client.on('mensaje',( payload)=>{
        console.log('Mensaje!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje a enviar'});
    });

    client.on('emitir-mensaje',( payload)=>{
        console.log(payload);
        //emite a todos los clientes
        //io.emit('nuevo-mensaje', payload);
        //Emite a todos memnos el que lo emito
        client.broadcast.emit('nuevo-mensaje', payload);
    });
    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {        
        bands.addBand( new Band(payload.name) );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {        
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });
    
   // client.on('vote-band',( payload)=>{
         //console.log(payload['id']);
        //bands.voteBand(payload.id);
        //io.emit('active-bands', bands.getBands());

        //emite a todos los clientes
        //io.emit('nuevo-mensaje', payload);
        //Emite a todos menos el que lo emito
        //io.emit('update-bands', bands.getBands());
   // });

});