puts "🌱 Seeding spices..."

puts 'Creating users...'
mike = User.create(username: "neisguy", profile_pic: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "I'm a pretty neis guy", password: "exp")
joe = User.create(username: "goldennugget", profile_pic: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "bogos binted", password: "exp")
mitch = User.create(username: "chocolaterain", profile_pic: "https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png", bio: "father", password: "exp")


puts 'Creating games...'
bomb = Game.create(api_id: 1902, title: "Dirty Bomb", image_id: "co28xg", total_rating: 59.7246095652837)
speed = Game.create(api_id: 102, title: "Need for Speed: Shift", image_id: "co209o", total_rating: 76.6925456903079)
mission = Game.create(api_id: 1502, title: "Front Mission 3", image_id: "co2v52", total_rating: 80.7336379331722)

puts 'Creating lists...'
mikes = List.create(user_id: mike.id, list_name: 'some games', public: true)
joes = List.create(user_id: joe.id, list_name: 'more games', public: false)
mitchs = List.create(user_id: mitch.id, list_name: 'even more games', public: true)


puts 'Creating list items...'
ListItem.create(list_id: mikes.id, game_id: bomb.id)
ListItem.create(list_id: mikes.id, game_id: speed.id)
ListItem.create(list_id: joes.id, game_id: mission.id)
ListItem.create(list_id: joes.id, game_id: bomb.id)
ListItem.create(list_id: mitchs.id, game_id: speed.id)


puts 'Creating wishlists...'
Wishlist.create(user_id: mike.id, game_id: mission.id)
Wishlist.create(user_id: joe.id, game_id: speed.id)
Wishlist.create(user_id: mike.id, game_id: mission.id)
Wishlist.create(user_id: mike.id, game_id: bomb.id)


puts 'Creating reviews...'
Review.create(user_id: mike.id, game_id: bomb.id, rating: 7, comment: "I don't know what this game is but its aight")
Review.create(user_id: mike.id, game_id: speed.id, rating: 9, comment: "fest.")
Review.create(user_id: joe.id, game_id: mission.id, rating: 3, comment: "wait a minute this isn't call of duty")
Review.create(user_id: mitch.id, game_id: speed.id, rating: 5, comment: "I drive like this in my sleep")



puts "✅ Done seeding!"