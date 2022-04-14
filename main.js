'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4,3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?

/**
 * this function takes in two arguments: startStack (where to move the disc from) and endStack (where to move the disc to)
 * @param {string} startStack 
 * @param {string} endStack 
 * @returns the pieces to a it's new stack
 */
const movePiece = (startStack,endStack) => {
  // Your code here
 
  //checks endStack length is > 0. If it is, check if the move is valid
  //if the move is valid, move the disc

  if(stacks[endStack].length  > 0) {

    if (isLegal(startStack,endStack) == true){
      stacks[endStack].push(stacks[startStack].pop())
   }
 }

  // if the endStack length is 0, autmatically move the disc from startStack to endStack

   if(stacks[endStack].length ==  0) {
      stacks[endStack].push(stacks[startStack].pop())
  }

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2

/**
 * this function checks if the move is legal or not
 * @param {string} startStack 
 * @param {string} endStack 
 * @returns true if the move is legal and false if the move is not legal
 */
const isLegal = (startStack,endStack) => {
  // Your code here



  //another method of doing it is using the below line 
  //stacks[endStack][stacks[endStack].length-1] > stacks[startStack][stacks[startStack].length - 1]

  if((stacks[endStack].slice(-1) > stacks[startStack].slice(-1) && stacks[startStack].length !== 0)) {
     console.log('move is legal')
     return true;
   }
   else {
     console.log('move is not legal')
     return false;
   }


}

// What is a win in Towers of Hanoi? When should this function run?

/**
 * this function checks for the win
 * @returns true if the b.length or c.length is 4
 */
const checkForWin = () => {
  // Your code here
  if(stacks.b.length == 4 || stacks.c.length == 4) {
    console.log('you win')
    return true;
  }

}

// When is this function called? What should it do with its argument?

/**
 * this function takes in two arguments and then runs movePiece function
 * //After movePiece it checks for the win
 * @param {string} startStack 
 * @param {string} endStack 
 * @returns does not return anything
 */
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //startStack = stacks.startStack;

  movePiece(startStack,endStack);
  if (checkForWin()){
    return true;
   }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
