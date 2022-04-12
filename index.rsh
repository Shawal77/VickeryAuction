'reach 0.1';
'use strict';
//specifyvalues you get from ineterfaces
const CommonInterface = {
    // Show the address of winner
    showOutcome: Fun([Address], Null),
  };//tell everone who won the auction
//export reach app
export const main = Reach.App(()=>{
    const Auctioneer=Participant('Auctioneer',{
        ...CommonInterface,
        bidFloor:UInt,
        deadline:UInt,
    });
    const Bidder=Participant('Bidder',{
        ...CommonInterface,
        amountBid:UInt,
    });
    init();
    //define show outcome
    const showOutcome=(who)=>
        each([Auctioneer,Bidder],()=>{
            interact.showOutcome(who);});
    //Auctioneer publishes bid floor and deadline
    Auctioneer.only(()=>{
        const bidFloor=declassify(interact.bidFloor);
        const deadline=declassify(interact.deadline);});
    Auctioneer.publish(bidFloor,deadline);
      
    //While deadline is yet to be reached allow bids
    
    //consensus pays to auctioneer second price
    transfer(bidPrice).to(winningBidder);
    commit();
    showOutcome(winningBidder);
});



/*priceList=[60]
for item in Users:
    bidder=Bidder(item[0],item[1],int(item[2]))
    if int(item[2])>=priceList[-1]:
        priceList.append(item[2])
        winner=item[0]
        amountToPay=int(priceList[-2]) */