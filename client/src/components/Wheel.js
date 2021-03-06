/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
  blk: {
    display: "inline-block",
    transformOrigin: "50% 50% -139px",
    transformStyle: "preserve-3d",
    top: "25%",    
    width: "80px",
    height: "80px",
    position: "absolute",
  },
  
  container: {
    display: "inline-block",
    transformOrigin: "50% 50% -139px",
    transformStyle: "preserve-3d",
    top: "25%",    
    right: "80px",
    width: "80px",
    height: "156px",
    position: "relative",
    marginLeft: "10px"
  }
}

const emoarr = ["😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😌", "😍", "😏", "😒", "😓", "😔", "😖", "😘", "😚", "😜", "😝", "😞", "😠", "😡", "😢", "😣", "😤", "😥", "😨", "😩", "😪", "😫", "😭", "😰", "😱", "😲", "😳", "😵", "😷", "😸", "😹", "😺", "😻", "😼", "😽", "😾", "😿", "🙀", "🙅", "🙆", "🙇", "🙈", "🙉", "🙊", "🙋", "🙌", "🙍", "🙎", "🙏", "✅", "✊", "✋", "✨", "❌", "❎", "❓", "❔", "❕", "❗", "➕", "➖", "➗", "➰", "🚀", "🚃", "🚄", "🚅", "🚇", "🚉", "🚌", "🚏", "🚑", "🚒", "🚓", "🚕", "🚗", "🚙", "🚚", "🚢", "🚤", "🚥", "🚧", "🚨", "🚩", "🚪", "🚫", "🚬", "🚭", "🚲", "🚶", "🚹", "🚺", "🚻", "🚼", "🚽", "🚾", "🛀", "🆎", "🆑", "🆒", "🆓", "🆔", "🆕", "🆖", "🆗", "🆘", "🆙", "🆚", "🈁", "🈚", "🈯", "🈲", "🈳", "🈴", "🈵", "🈶", "🈸", "🈹", "🈺", "🉐", "🉑", "⌚", "⌛", "⏩", "⏪", "⏫", "⏬", "⏰", "⏳", "⚪", "⚫", "⚽", "⛄", "⛅", "⛎", "⛔", "⛪", "⛲", "⛳", "⛵", "⛺", "⛽", "⬅", "⬆", "⬇", "⬛", "⬜", "⭐", "⭕", "🀄", "🃏", "🌀", "🌁", "🌂", "🌃", "🌄", "🌅", "🌆", "🌇", "🌈", "🌉", "🌊", "🌋", "🌌", "🌏", "🌑", "🌓", "🌔", "🌕", "🌙", "🌛", "🌟", "🌠", "🌰", "🌱", "🌴", "🌵", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼", "🌽", "🌾", "🌿", "🍀", "🍁", "🍂", "🍃", "🍄", "🍅", "🍆", "🍇", "🍈", "🍉", "🍊", "🍌", "🍍", "🍎", "🍏", "🍑", "🍒", "🍓", "🍔", "🍕", "🍖", "🍗", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍞", "🍟", "🍠", "🍡", "🍢", "🍣", "🍤", "🍥", "🍦", "🍧", "🍨", "🍩", "🍪", "🍫", "🍬", "🍭", "🍮", "🍯", "🍰", "🍱", "🍲", "🍳", "🍴", "🍵", "🍶", "🍷", "🍸", "🍹", "🍺", "🍻", "🎀", "🎁", "🎂", "🎃", "🎄", "🎅", "🎆", "🎇", "🎈", "🎉", "🎊", "🎋", "🎌", "🎍", "🎎", "🎏", "🎐", "🎑", "🎒", "🎓", "🎠", "🎡", "🎢", "🎣", "🎤", "🎥", "🎦", "🎧", "🎨", "🎩", "🎪", "🎫", "🎬", "🎭", "🎮", "🎯", "🎰", "🎱", "🎲", "🎳", "🎴", "🎵", "🎶", "🎷", "🎸", "🎹", "🎺", "🎻", "🎼", "🎽", "🎾", "🎿", "🏀", "🏁", "🏂", "🏃", "🏄", "🏆", "🏈", "🏊", "🏠", "🏡", "🏢", "🏣", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🏰", "🐌", "🐍", "🐎", "🐑", "🐒", "🐔", "🐗", "🐘", "🐙", "🐚", "🐛", "🐜", "🐝", "🐞", "🐟", "🐠", "🐡", "🐢", "🐣", "🐤", "🐥", "🐦", "🐧", "🐨", "🐩", "🐫", "🐬", "🐭", "🐮", "🐯", "🐰", "🐱", "🐲", "🐳", "🐴", "🐵", "🐶", "🐷", "🐸", "🐹", "🐺", "🐻", "🐼", "🐽", "🐾", "👀", "👂", "👃", "👄", "👅", "👆", "👇", "👈", "👉", "👊", "👋", "👌", "👍", "👎", "👏", "👐", "👑", "👒", "👓", "👔", "👕", "👖", "👗", "👘", "👙", "👚", "👛", "👜", "👝", "👞", "👟", "👠", "👡", "👢", "👣", "👤", "👦", "👧", "👨", "👩", "👪", "👫", "👮", "👯", "👰", "👱", "👲", "👳", "👴", "👵", "👶", "👷", "👸", "👹", "👺", "👻", "👼", "👽", "👾", "👿", "💀", "💁", "💂", "💃", "💄", "💅", "💆", "💇", "💈", "💉", "💊", "💋", "💌", "💍", "💎", "💏", "💐", "💑", "💒", "💓", "💔", "💕", "💖", "💗", "💘", "💙", "💚", "💛", "💜", "💝", "💞", "💟", "💠", "💡", "💢", "💣", "💤", "💥", "💦", "💧", "💨", "💩", "💪", "💫", "💬", "💮", "💯", "💰", "💱", "💲", "💳", "💴", "💵", "💸", "💹", "💺", "💻", "💼", "💽", "💾", "💿", "📀", "📁", "📂", "📃", "📄", "📅", "📆", "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "📏", "📐", "📑", "📒", "📓", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "📛", "📜", "📝", "📞", "📟", "📠", "📡", "📢", "📣", "📤", "📥", "📦", "📧", "📨", "📩", "📪", "📫", "📮", "📰", "📱", "📲", "📳", "📴", "📶", "📷", "📹", "📺", "📻", "📼", "🔃", "🔊", "🔋", "🔌", "🔍", "🔎", "🔏", "🔐", "🔑", "🔒", "🔓", "🔔", "🔖", "🔗", "🔘", "🔙", "🔚", "🔛", "🔜", "🔝", "🔞", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤", "🔥", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "🔮", "🔯", "🔰", "🔱", "🔲", "🔳", "🔴", "🔵", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "🔼", "🔽", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🗻", "🗼", "🗽", "🗾", "🗿", "😀", "😇", "😈", "😎", "😐", "😑", "😕", "😗", "😙", "😛", "😟", "😦", "😧", "😬", "😮", "😯", "😴", "😶", "🚁", "🚂", "🚆", "🚈", "🚊", "🚍", "🚎", "🚐", "🚔", "🚖", "🚘", "🚛", "🚜", "🚝", "🚞", "🚟", "🚠", "🚡", "🚣", "🚦", "🚮", "🚯", "🚰", "🚱", "🚳", "🚴", "🚵", "🚷", "🚸", "🚿", "🛁", "🛂", "🛃", "🛄", "🛅", "🌍", "🌎", "🌐", "🌒", "🌖", "🌗", "🌘", "🌚", "🌜", "🌝", "🌞", "🌲", "🌳", "🍋", "🍐", "🍼", "🏇", "🏉", "🏤", "🐀", "🐁", "🐂", "🐃", "🐄", "🐅", "🐆", "🐇", "🐈", "🐉", "🐊", "🐋", "🐏", "🐐", "🐓", "🐕", "🐖", "🐪", "👥", "👬", "👭", "💭", "💶", "💷", "📬", "📭", "📯", "📵", "🔀", "🔁", "🔂", "🔄", "🔅", "🔆", "🔇", "🔉", "🔕", "🔬", "🔭", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"];

class Wheel extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      element: [0, 1, 2, 3, 4, 5,6,7,8,9].map(() => {
        return {
          color: `rgba(${this.getRand(1)}, .9)`,
          image: emoarr[Math.floor(Math.random() * emoarr.length)],
      }
      }),
      deg: 0,
    };
  }

  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop = () => {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.loop);
    }
  }

  loop = () => {
    // perform loop work here
    this.theoreticalComponentAnimationFunction();

    // Set up next iteration of the loop
    this.frameId = window.requestAnimationFrame(this.loop);
  }

  stopLoop = () => {
    window.cancelAnimationFrame(this._frameId);
    // Note: no need to worry if the loop has already been cancelled
    // cancelAnimationFrame() won't throw an error
  }

  theoreticalComponentAnimationFunction = () => {
    this.setState({deg : (this.state.deg + this.props.speed / 3) % 360});
  }

  getRand = (seed) => {
    return Math.round(Math.random() * seed * 255) + "," + Math.round(Math.random() * seed * 255) + "," + Math.round(Math.random() * seed * 255);
  }

  render() {
    const {classes} = this.props;

    return(
      <div className={classes.container} style={{
        transform: `rotateY(10deg) rotateX(${this.state.deg}deg)`,
        zIndex: 3 - this.props.speed,}}>
        {this.state.element.map(
          (e, index) => 
            <div id = {index + "face" + this.props.speed} 
              key={this.props.speed + index}
              style={{                
                backgroundColor: e.color,
                transform: `rotateX(${360 / this.state.element.length * index}deg)`,}}
              className={classes.blk}>{e.image}</div>
            )}
      </div>
    );
  };
}

Wheel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wheel);