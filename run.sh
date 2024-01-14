echo "
We will be playing the role of the Player


The private key and address of the player:
  Private Key  APrivateKey1zkpCu1LR1V4Dsd4AMhpT4PHeumeqe3h1VvUY7VkzEZdXpCy
     View Key  AViewKey1gdzdyNXnG62NXAUrP1RRE25WySxUtxqwp3cHTDSUanvs
      Address  aleo1yg3gs3v5rjdh0ajm6xeyzwtdfuyfeaqv7y7hwxjv55au5d4jpyyqsl060h

The address of the casino:
    aleo1696yxs062yrm0nmvflwcp7zjy0l8l4w8gpr3wn0ql3nttu54ayqsuxqus5


"

echo "
Let's mint some Fortune Tokens to the Casino and the Player. We'll deposit 100 tokens to the casino and 50 tokens to the player.

leo run deposit_public aleo1696yxs062yrm0nmvflwcp7zjy0l8l4w8gpr3wn0ql3nttu54ayqsuxqus5 100u64

leo run deposit_public aleo1yg3gs3v5rjdh0ajm6xeyzwtdfuyfeaqv7y7hwxjv55au5d4jpyyqsl060h 50u64
"

# Swap in the private key of the player to .env.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpCu1LR1V4Dsd4AMhpT4PHeumeqe3h1VvUY7VkzEZdXpCy
" > .env

leo run deposit_public aleo1696yxs062yrm0nmvflwcp7zjy0l8l4w8gpr3wn0ql3nttu54ayqsuxqus5 100u64

leo run deposit_public aleo1yg3gs3v5rjdh0ajm6xeyzwtdfuyfeaqv7y7hwxjv55au5d4jpyyqsl060h 50u64

echo "
Let's spin and see if we can get rich!. Starting with babys steps, we'll play the red-black and put 5 tokens to the RED.
It gives the input true for the bet on red, and false for the bet on black.

leo run make_red_black_bet_public 5u64 true

"

leo run make_red_black_bet_public 5u64 true



