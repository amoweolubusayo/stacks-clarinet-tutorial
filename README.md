# Building on Stacks

# A quick glance at Stacks

If you are interested in building on the blockchain, you might want to check out Stacks techbology! Briefly, this guide would take you through on the technology and it's uniqueness! Great! Let's dive in.

Stacks 2.0 is a layer-1 blockchain that allows developers build dApps (decentralized apps) on the Bitcoin network using smart contracts. Because of how secure and dependable the Bitcoin is, the Stacks team decided to utilize the network by natively integrating it with smart contracts and applications.

# Proof of Transfer ("PoX")

Stacks 2.0 implements the Proof of Transfer ("PoX") consensus mechanism. Incase, you are wondering what a consensus mechanism is, here is the definition. In a blockchain system, a consensus mechanism is a fault-tolerant technique that is used to obtain the required consensus on a single data value or a single state of the network across distributed processes or multi-agent systems, such as with cryptocurrencies.

PoX is actually an extension of the proof-of-burn mechanism (a consensus mechanism where miners compete by burning a proof-of-work cryptocurrency as a proxy for computing resources). In PoX which is unlike proof-of-burn, the cryptocurrency isn't burned, miners transfer the committed cryptocurrency to some other participants in the network.

PoX uses Bitcoin to secure Stacks. Anything that happens on the Stacks blockchain can be verified on the Bitcoin Blockchain. PoX reuses already minted bitcoins as "proof of computation" and miners represent their cost of mining in bitcoins directly.

Here is the diagramtical representation of how PoX mechanism works and how participation is done

![](https://i.imgur.com/rB96lU0.png)

![](https://i.imgur.com/w7eEleH.png)

# What are blocks and microblocks in Stacks?

A block of transactions on Stacks corresponds to a single Bitcoin transaction thus improving the cost to byte ratio for processing Stacks transactions and preventing denial-of-service attacks.

Microblocks allow transactions on Stacks to be completed in time without compromising confidence. This allows Stacks transaction throughput to scale independently of Bitcoin, and at the same time Stacks establishes finality with the Bitcoin chain.

# Using The Stacks API

Stacks has a blockchain API so that anyone who wants to query the Stacks 2.0 blockchain can use it to interact with smart contracts. You get a paginated, materialized views of the Stacks 2.0 Blockchain when you use the Stacks API. Let's demostrate how to make a call to the one of the endpoints from the API. We will be making two calls, one to the retrieve a list of recently mined blocks and the other to retrieve a list of recents microblocks.

> Note: If you want to actively monitor new blocks or microblocks, The Stacks team recommends subscribing to [WebSockets or Socket.io](https://github.com/hirosystems/stacks-blockchain-api/tree/master/client) from their github for real-time updates.

You can either use cUrL or Postman to make calls. We will use both in this case for each call.

**Retrieve a list of recently mined blocks using `POSTMAN`**

[Download Postman](https://www.postman.com/downloads) if you do not have. Proceed to Launch the Postman app.

Select the GET method and type https://stacks-node-api.testnet.stacks.co/extended/v1/block into the url placeholder. Then press `SEND`

![](https://i.imgur.com/WSrJaoj.png)

You will be able to see a list of recent blocks that were mined with information such as block hash, block height, miner transaction ID etc.

> Note: these results are from testnet(i.e the test network, if you wish to make calls on the mainnet(i.e the main network) just replace the `testnet` in https://stacks-node-api.testnet.stacks.co/extended/v1/block to `mainnet`)

**Retrieve a list of recents microblocks using `cURL`**

Proceed to launch your terminal on your device. Then type in this command

```bash
curl https://stacks-node-api.testnet.stacks.co/extended/v1/microblock
```

Press `ENTER`

![](https://i.imgur.com/P6T8QxM.png)

You will be able to see a list of recent microblocks with information such as microblock hash, microblock parent hash, parent burn block height etc.

> Note: these results are from testnet(i.e the test network, if you wish to make calls on the mainnet(i.e the main network) just replace the `testnet` in https://stacks-node-api.testnet.stacks.co/extended/v1/microblock to `mainnet`)

# Writing smart contracts on Stacks

# Clarity

Clarity is a language for Stacks blockchain-compatible smart contracts that is decidable and optimised for security and predictability. On a blockchain, smart contracts give developers the ability to store crucial business logic. The Clarity language uses a strong static type system, LISP based.

Clarity allows for complete static analysis of the entire call graph of a given smart contract. Clarity is also a decidable language.

Smart contracts in Clarity typically have two parts which are the:

1. Data space
2. Set of functions

Some things to note from the Clarity programming language

1. The only primitive types are booleans, integers, buffers, and principals.
1. Recursion is illegal and there are no anonymous functions.
1. Looping is only performed via map, filter, or fold.
1. There is support for lists, however, the only variable length lists in the language appear as function inputs; there is no support for list operations like append or join.
1. Variables are immutable.

# Types

Here is a list of the types we have in the Clarity langauge and what they represent

| Types                                                 | Notes                                                                                                                                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `int`                                                 | signed 128-bit integer                                                                                                                                                               |
| `uint`                                                | unsigned 128-bit integer                                                                                                                                                             |
| `bool`                                                | boolean value (`true` or `false`)                                                                                                                                                    |
| `principal`                                           | object representing a principal (whether a contract principal or standard principal)                                                                                                 |
| `(buff max-len)`                                      | byte buffer of maximum length `max-len`.                                                                                                                                             |
| `(string-ascii max-len)`                              | ASCII string of maximum length `max-len`                                                                                                                                             |
| `(string-utf8 max-len)`                               | UTF-8 string of maximum length `max-len` (u"A smiley face emoji \u{1F600} as a utf8 string")                                                                                         |
| `(list max-len entry-type)`                           | list of maximum length `max-len`, with entries of type `entry-type`                                                                                                                  |
| `{label-0: value-type-0, label-1: value-type-1, ...}` | tuple, group of data values with named fields                                                                                                                                        |
| `(optional some-type)`                                | an option type for objects that can either be `(some value)` or `none`                                                                                                               |
| `(response ok-type err-type)`                         | object used by public functions to commit their changes or abort. May be returned or used by other functions as well, however, only public functions have the commit/abort behavior. |

# Basic Clarity functions

**`+ (add)`**

This function adds a variable number of integer inputs and returns the result. If for any reason there is an overflow, the function will throw a runtime error.

| input    | output   | signature |
| -------- | -------- | --------- |
| int uint | int uint | (+ i1 i2) |

Example:

```
(+ 1 2 3)

Result: 6
```

```
(+ 2 3)

Result:  5
```

```
(+ 9 -3)

Result: 6
```

```
(+ -3 -2)

Result: -5
```

**`- (subtract)`**

This function subtracts a variable number of integer inputs and returns the result. If for any reason there is an overflow, the function will throw a runtime error.

| input    | output   | signature |
| -------- | -------- | --------- |
| int uint | int uint | (- i1 i2) |

```
(- 2 1 1)

Result: 0
```

```
(- 0 3)

Result:  -3
```

```
(- 5 -3)

Result: 8
```

```
(- -4 -5)

Result: 1
```

**`* (multiply)`**

This function multiplies a variable number of integer inputs and returns the result. If for any reason there is an overflow, the function will throw a runtime error.

| input    | output   | signature  |
| -------- | -------- | ---------- |
| int uint | int uint | (\* i1 i2) |

```
(* 2 3)

Result: 6
```

```
(* 5 2)

Result:  10
```

```
(* 3 -2)

Result: -6
```

```
(* -1 -2)

Result: 2
```

**` / (divide)`**

This function divides a variable number of integer inputs and **returns the integer part of the result**. If for any reason there is an overflow, the function will throw a runtime error.

| input    | output   | signature  |
| -------- | -------- | ---------- |
| int uint | int uint | (\* i1 i2) |

```
(/ 2 3)

Result: 0
```

```
(/ 5 2)

Result:  2
```

```
(/ 4 2 2)

Result: 1
```

```
(/ -9 4)

Result: -2
```

If you are curious to know more, you can check out other functions [here](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-functions)

For next steps of this guide, we will be building an on-chain calculator which can perform basic math operations (addition, subtraction, division, and multiplication) and then go ahead to deploy it to the Stacks testnet.

# Set up Dev Enviroment

Let us set up our development enviroment first. Start by installing `clarity repl` directly via [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

Run this command

`cargo install clarity-repl`

![](https://i.imgur.com/Jdn8rpc.png)

Then copy the clarinet binary to /usr/local/bin

`mv ~/Downloads/clarinet /usr/local/bin`

Proceed to confirm your installation by running this command

`clarinet --version`

![](https://i.imgur.com/OjEOLY6.png)

# Writing a simple Smart Contract using Clarity

Every action in the domain of smart contracts is a blockchain transaction. We shall be looking at writing a simple smart contract that simulates an on-chain calculator. The calculator will perform basic math operations (i.e addition, subtraction, division, and multiplication). We will also deploy it to the Stacks testnet.

If you haven't set up your environment please refer back to the [Set up Dev Enviroment section ](https://hackmd.io/HFo4tEDlRnejbCUZo9ugxw#Set-up-Dev-Enviroment)

Open your terminal and use clarinet to create a new project

```
clarinet new demo
```

![](https://i.imgur.com/2fh4dRm.png)

Optionally, you can enable telementry, this means sending the creators of Clarinet - Hiro diagnostics and usage data. Type 'Y' and `enter`.

Congratulations:tada::tada::tada:! You have just created your first clarinet project. The beautuful thing about the clarinet console is that is give some hints on what to do for example in the image above, it gives hints around writing tests.

Let's continue coding by launching our IDE(Integrated Development Environment). In this tutorial we will be using Visual Studio Code, incase you don't have it installed please install [here](https://code.visualstudio.com/download)

Run the following command in the folder you created your clarinet project. This will navigate to your project and in turn open the IDE

```
cd demo && code .
```

This is what you would see

![](https://i.imgur.com/nJpqYoC.png)

You can play around opening the folders to see their contents. There is the contracts, deployments, settings and tests folders.

Notice that the contracts folder is empty, this is because we have not created any contracts yet. That's changing soon.

Let's start creating our contract with clarinet of course :)

Run the following command

```
clarinet contract new arithmetic
```

![](https://i.imgur.com/VkIbtjA.png)

Notice that two files are created for you under the `contracts` and `tests` folders, `arithmetic.clar` and `arithmetic_test.ts`

![](https://i.imgur.com/pTqUwdB.png)

If you open the contracts/arithmetic.clar file you will find something like this

```javascript
;; arithmetic
;; <add a description here>

;; constants
;;

;; data maps and vars
;;

;; private functions
;;

;; public functions
;;
```

This comes by default. We would have to replace it with our own.
Copy the following code and I will be explaining somethings shortly

```javascript

;; arithmetic
;; An on-chain calculator which can perform basic math operations (addition, subtraction, division, and multiplication)

;; This adds two integers and gives the output
(define-public (addition (x int) (y int) )
    (ok (+ x y)))

;; This does the subtraction between two integers and gives the output
(define-read-only (subtraction (x int) (y int))
    (ok (- x y)))

;; This multiplies two integers and gives the output
(define-read-only (multiplication (x int) (y int))
    (ok (* x y)))

;; This does the division between two integers and gives the output
(define-public (division (x int) (y int))
    (ok (/ x y)))

```

For a quick reminder on how these arithmetic functions work, refer back to [Basic Clarity functions](https://hackmd.io/HFo4tEDlRnejbCUZo9ugxw#Basic-Clarity-functions)

Back to our code, notice we use the `define-read-only` function.

> define-read-only is used to define a public read-only function for a smart contract. Such functions are callable from other smart contracts.

**Check Contract**

Now that we understand how our code works, let us check our contracts.
What does this mean? Clarinet provides syntax and semantics checkers for Clarity. That way, we can check that the Clarity code in our project is valid. To do that, let's run this command

```
clarinet check
```

When this command executes, it checks and analyzes all the contracts present in the project from the `Clarinet.toml` file which is located in our root folder.

![](https://i.imgur.com/BIRdGpI.png)

As soon as it confirms that the Clarity code is valid, the command will indicate success and you should see something like this:

![](https://i.imgur.com/bSQiGA0.png)

**Using the Clarinet Console to load and test contracts**

The Clarinet console is an interactive Clarity REPL that runs in-memory. Any contracts in the current project are automatically loaded into memory. If you want to load and test your contract in the console, run this command

```
clarinet console
```

You will see the view of all the contracts loaded like below

![](https://i.imgur.com/ioIAhrs.png)

Let's interact with our contracts. So we will add two numbers and see how it works. `arithmetic` is the name of our contract and `addition` is the function we are trying to call.

```
(contract-call? .arithmetic addition 3 5)
```

![](https://i.imgur.com/xOu9Ssm.png)

Super easy right!

Let's do the same thing for subtraction, division and multiplication.

![](https://i.imgur.com/NLR4jva.png)

There are similarly other ways to test your contract but we would look at that in the next module :) as we would need some understanding of the Deno language syntax. For some heads up, you can check [here](https://docs.hiro.so/smart-contracts/clarinet#testing-with-the-test-harness)

# Deploying your contract

The Hiro Web Wallet must be set up in order for us to deploy our clarity smart contract to the Stacks Testnet network. To do that, add to your browser, the hiro web extension. It's available on broswers like chrome and brave.

![](https://i.imgur.com/G7pg8pw.png)

![](https://i.imgur.com/NzYGyta.png)
![](https://i.imgur.com/lsUkWjq.png)

> **Note: Remember to back up your key**

![](https://i.imgur.com/DDxD9Ql.png)

Congratulations :tada::tada: on having your own Hiro Web Wallet. We would need some STX however but you can interact with the interface for a bit

![](https://i.imgur.com/B8VWA2j.png)

![](https://i.imgur.com/k0uRTAO.png)

Since this is for learning purposes, we would be using the testnet. To get some STX, just go to the faucet [here](https://explorer.stacks.co/sandbox/faucet?chain=testnet) and connect your wallet then request for STX. You will get 500 STX.

![](https://i.imgur.com/DjwIgaU.png)

It is very important that your wallet is on the testnet or else you won't see your test tokens. So if for any reason you can't find your tokens it's most likely because it's on mainnet so kindly change the network to testnet.

![](https://i.imgur.com/puxBYR4.png)

Click on change network and change :accept:

![](https://i.imgur.com/APNPjkJ.png)

There are two ways to deploy your contract

1. Via Sandbox (What we will be looking at in this guide)
2. Via the terminal

**Via Sandbox**

Head over [here](https://explorer.stacks.co/sandbox/deploy?chain=testnet)

![](https://i.imgur.com/drqemcC.png)

Name your contract, paste your code in the code editor and click on deploy, you would see your wallet pop up like below

![](https://i.imgur.com/BCj0CDZ.png)

To view your deployed contract, open your wallet and check your activity, the transaction will be pending for a bit but will get completed

![](https://i.imgur.com/ZuJv7s1.png)

Click on your contract to get redirected to the stacks explorer.

![](https://i.imgur.com/ibehlTq.png)

Congratulations :tada::tada: on deploying your first contract on Stacks!

You can view the contract created in this guide here

https://explorer.stacks.co/txid/0x3a76ccc4b0cbfda9f279c80c410dc9d8cc7ec7a2bb97eb81f7740bead8ac2504?chain=testnet

**What you learnt in this guide**

:white_check_mark: A quick glance at Stacks

:white_check_mark: Proof of Transfer (“PoX”)

:white_check_mark: What blocks and microblocks in Stacks represent

:white_check_mark: Using The Stacks API

:white_check_mark: Writing smart contracts on Stacks

:white_check_mark: Understanding Clarity syntax

:white_check_mark: Deploying smart contracts on Stacks
