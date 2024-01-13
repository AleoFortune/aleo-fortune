program fortune_test.aleo {

	// Mappings
	mapping account: address => u64;
	mapping random_number_map: address=>u32;
	mapping winner: address=>bool;
  
    const cassino_address: address = aleo1696yxs062yrm0nmvflwcp7zjy0l8l4w8gpr3wn0ql3nttu54ayqsuxqus5;

    // Simplified transition for placing a bet
    transition place_bet_public(
        public player: address,
        public bet_amount: u64,
        public choices: [u32; ], // Array of chosen numbers (e.g., [0, 2, 4, ..., 36] for even)
        public multiplier: u64
    ) {
        // Generate a random number
        let random_number: u32 = ChaCha::rand_u32() % 37u32; // 0 to 36
        Mapping::set(random_number_map, player, random_number);

        // Check if the random number is in the user's choices
        let win: bool = choices.contains(random_number);

        // Calculate the result
        return then finalize(player, bet_amount, multiplier, win);
    }

    // Finalize the bet and handle payouts
    finalize_bet(
        public player: address,
        public bet_amount: u64,
        public multiplier: u64,
        public win: bool
    ) {
        let player_balance: u64 = Mapping::get_or_use(account, player, 0u64);
        let casino_balance: u64 = Mapping::get_or_use(account, cassino_address, 0u64);

        if (win) {
            let payout: u64 = bet_amount * multiplier;
            player_balance += payout;
            casino_balance -= payout;
        } else {
            casino_balance += bet_amount;
        }

        Mapping::set(account, player, player_balance);
        Mapping::set(account, cassino_address, casino_balance);
    }

    // ... rest of your contract ...
}

}  
