import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const numOfBidders=10;//this will be change to length of actual users

const stdlib=loadStdlib();
const startingBalance=stdlib.parseCurrency(100);
//create user accounts
const accAuctioneer = await stdlib.newTestAccount(startingBalance);
const accBidder = await Promise.all(
    Array.from({ length: numOfBidders }, () =>//wait for bidders list
        stdlib.newTestAccount(startingBalance)
    )
);
//Auctioneer begins contract
const ctcAuctioneer = accAuctioneer.contract(backend);
const ctcInfo = ctcAuctioneer.getInfo();

const AuctioneerParams = {
    bidFloor: stdlib.parseCurrency(60),
    deadline: 5,
};
await Promise.all([
    backend.Auctioneer(ctcAuctioneer,{
        showOutcome: (addr)=>console.log(`Auctioneer saw ${stdlib.formatAddress(addr)} won.`),
        getParams: ()=>AuctioneerParams,
    }),
].concat(
    accBidderArray.map((accBidder,i)=>{
        const ctcBidder = accBidder.contract(backend,ctcInfo);
        return backend.Bidder(ctcBidder,{
            showOutcome: (outcome)=>{
                console.log(`Bidder ${i} saw they ${stdlib.addressEq(outcome,accBidder)? 'won':'lost'}.`)
            },
            showPurchase: (addr) => {
                if (stdlib.addressEq(addr, accBuyer)) {
                  console.log(`Bidder ${i} bought a ticket.`);
                }
            }
        });
    })
));