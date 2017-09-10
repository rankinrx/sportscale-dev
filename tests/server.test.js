const expect = require('expect');
const request = require('supertest');

const app = require('./../app');
var agent = request.agent(app);

const Athlete = require('./../models/athlete');

// First empty database
beforeEach((done) => {
    Athlete.remove({}).then(() => done());
});

// Wait on express app to initialize and listen on port
// before(function (done) {  
//     app.on("appStarted", function(){
//         done();
//     });
// });

// Test
describe('POST /athletes/create', () => {
   it('should create a new athlete', (done) => {
        var firstName = "First";
        var lastName = "Athlete";

        agent
            .post('/athletes/create')
            .send({firstName, lastName})
            //.expect(302)
            .expect(() => {
                expect(res.body.firstName).toBe(firstName);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Athlete.find().then((athletes) => {
                    expect(athletes.length).toBe(1);
                    expect(athletes[0].fname).toBe(firstName);
                    done();
                }).catch((e) => done(e));
            });
   });
});