import React from 'react';
import playingCards from './playingCards';

class DealerTest extends React.Component {

     constructor(props) {
          super(props);
          this.state = {

          }

          console.log(playingCards);

     }

     // Helper Function: shuffle the deck to start with, source: https://www.jstips.co/en/javascript/shuffle-an-array/
     shuffle = (arr) => {
         var i,
             j,
             temp;
         for (i = arr.length - 1; i > 0; i--) {
             j = Math.floor(Math.random() * (i + 1));
             temp = arr[i];
             arr[i] = arr[j];
             arr[j] = temp;
         }
         return arr;
     };


     getHCP = (arr) => {

          let hcp = 0;

          for(let i = 0; i < arr.length; i++) {

               let currentCardValue = arr[i].value;
               if( currentCardValue === 14 ) { hcp += 4; }
               else if( currentCardValue === 13 ) { hcp += 3; }
               else if( currentCardValue === 12 ) { hcp += 2; }
               else if( currentCardValue === 11 ) { hcp += 1; }
               //console.log("HCP: " + hcp);
          }

          return hcp;

     }


     average = (array) => array.reduce((a, b) => a + b) / array.length;

     findMedian = (arr) => {

          arr.sort(function(a, b){ return a - b; });
          var i = arr.length / 2;
          return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];

     }


     render() {

          const numberOfSimsRun = 100000;

          // set up the loop and vars
          let northAllHands = [];
          let southAllHands = [];
          let eastAllHands = [];
          let westAllHands = [];

          for(let i = 0; i < numberOfSimsRun; i++) {

               const newDeck = [...playingCards];
               this.shuffle(newDeck);

               const northCards = newDeck.splice(0,13);
               const northHCP = this.getHCP(northCards);
               northAllHands.push(northHCP);

               const southCards = newDeck.splice(0,13);
               const southHCP = this.getHCP(southCards);
               southAllHands.push(southHCP);

               const eastCards = newDeck.splice(0,13);
               const eastHCP = this.getHCP(eastCards);
               eastAllHands.push(eastHCP);

               const westCards = newDeck.splice(0,13);
               const westHCP = this.getHCP(westCards);
               westAllHands.push(westHCP);

          }

          const northMinHCP  = Math.min(...northAllHands);
          const northMaxHCP  = Math.max(...northAllHands);
          const northMedian = this.findMedian(northAllHands);
          const northAvg = this.average(northAllHands).toFixed(2);

          const southMinHCP  = Math.min(...southAllHands);
          const southMaxHCP  = Math.max(...southAllHands);
          const southMedian = this.findMedian(southAllHands);
          const southAvg = this.average(southAllHands).toFixed(2);

          const eastMinHCP  = Math.min(...eastAllHands);
          const eastMaxHCP  = Math.max(...eastAllHands);
          const eastMedian = this.findMedian(eastAllHands);
          const eastAvg = this.average(eastAllHands).toFixed(2);

          const westMinHCP  = Math.min(...westAllHands);
          const westMaxHCP  = Math.max(...westAllHands);
          const westMedian = this.findMedian(westAllHands);
          const westAvg = this.average(westAllHands).toFixed(2);

          return (
               <>
                 <div className="clb-dealer-test-area">
                    <h1>Statistical Analysis based on {numberOfSimsRun} Hands Dealt</h1>
                    <div className="section-summary-area">
                         <h2>North HCP Avg: {northAvg}</h2>
                         <h3>North HCP Median: {northMedian}</h3>
                         <h3>North HCP High: {northMaxHCP}</h3>
                         <h3>North HCP Low: {northMinHCP}</h3>
                    </div>

                    <div className="section-summary-area">
                         <h2>South HCP Avg: {southAvg}</h2>
                         <h3>South HCP Median: {southMedian}</h3>
                         <h3>South HCP High: {southMaxHCP}</h3>
                         <h3>South HCP Low: {southMinHCP}</h3>
                    </div>

                    <div className="section-summary-area">
                         <h2>East HCP Avg: {eastAvg}</h2>
                         <h3>East HCP Median: {eastMedian}</h3>
                         <h3>East HCP High: {eastMaxHCP}</h3>
                         <h3>East HCP Low: {eastMinHCP}</h3>
                    </div>

                    <div className="section-summary-area">
                         <h2>West HCP Avg: {westAvg}</h2>
                         <h3>West HCP Median: {westMedian}</h3>
                         <h3>West HCP High: {westMaxHCP}</h3>
                         <h3>West HCP Low: {westMinHCP}</h3>
                    </div>

                 </div>
            </>
          );

     }

}

export default DealerTest;
