# Slot Machine Game

A reactive, interactive slot machine game built with HTML, CSS, and vanilla JavaScript.

## Features

- **Classic 3-reel slot machine** with colorful emoji symbols
- **Reactive gameplay** with smooth animations
- **Credits system** starting with 100 credits
- **Adjustable betting** (5-50 credits per spin)
- **Win detection** with multiple payout combinations
- **Responsive design** that works on desktop and mobile devices
- **Visual feedback** with animations for wins and jackpots

## How to Play

1. Open `index.html` in your web browser
2. Click the **SPIN** button to play (costs 10 credits by default)
3. Use **+** and **-** buttons to adjust your bet amount
4. Match symbols to win credits:
   - 3 cherries (🍒🍒🍒) = 50x bet
   - 3 lemons (🍋🍋🍋) = 40x bet
   - 3 oranges (🍊🍊🍊) = 30x bet
   - 3 grapes (🍇🍇🍇) = 25x bet
   - 3 watermelons (🍉🍉🍉) = 20x bet
   - 3 stars (⭐⭐⭐) = 100x bet - JACKPOT!
   - Any 2 matching symbols = 2x bet

## Game Controls

- **SPIN** - Spin the reels (requires sufficient credits)
- **+** - Increase bet by 5 credits
- **-** - Decrease bet by 5 credits
- **Reset Game** - Start over with 100 credits

## Technical Details

### Files
- `index.html` - Game structure and layout
- `styles.css` - Styling and animations
- `script.js` - Game logic and interactivity

### Technologies Used
- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)

### Features Implementation
- **Async/await** for reel spinning animations
- **CSS animations** for smooth transitions
- **Responsive design** with media queries
- **Event-driven** architecture for user interactions

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Credits

Created as a fun, interactive web game demonstrating modern web development techniques.
