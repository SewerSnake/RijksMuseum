


var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var ReactRouterDOM = require('react-router-dom');
var Square = require('./components/square.jsx');


  var destination = document.querySelector(".logo");
  var destination2 = document.querySelector(".logoS");

  class LogoLetter extends React.Component {
    render() {
      return (
        <div id="logoletter">
        {this.props.children}
        </div>
      );
    }
  }
  class LogoLetter2 extends React.Component {
    render() {
      return(
        <div id="logoletter2">
    {this.props.children}
        </div>
      );
    }
  }

  ReactDOM.render(
    <div>
      <LogoLetter>P</LogoLetter>
      <LogoLetter>U</LogoLetter>
      <LogoLetter>S</LogoLetter>
      <LogoLetter>E</LogoLetter>
      <LogoLetter>U</LogoLetter>
      <LogoLetter>M</LogoLetter>
    </div>,
    destination
  );
  ReactDOM.render(
    <div>
      <LogoLetter2>A</LogoLetter2>
      <LogoLetter2>P</LogoLetter2>
      <LogoLetter2>P</LogoLetter2>
    </div>,
    destination2
  );

  class Home extends React.Component {
    render() {
        return <section id="section-a">
                  <div className="content-wrap">
                    <h2 className="content-title">Fine art & web technology</h2>
                    <p>Built with:</p>
                      <div id="builtWithCards">
                        <Card color="lightgrey" colorL="#FFC983" name="React" image={'media/React-icon.svg'}/>
                        <Card color="lightgrey" colorL="#FFC983" name="Webpack" image={'media/webpack.svg'}/>
                        <Card color="lightgrey" colorL="#FFC983" name="Babel" image={'media/babel.svg'}/>
                        <Card color="lightgrey" colorL="#FFC983" name="Jsx" image={'media/jsx22.png'}/>
                      </div>

                  </div>
                </section>
          }
  }

  // var homePageContent = document.querySelector(".content-wrap");
// 1. Card component with 3parts

class Label extends React.Component {
  render() {
    var labelStyle = {

      fontWeight: "bold",
      backgroundColor: this.props.colorL,
      padding: 13,
      height: 30,
      color: 'black',
      margin: 0
    };
    return (
      <p style={labelStyle}>{this.props.name}</p>
    );
  }
}
class Card extends React.Component {
  render() {
    var cardStyle = {
      display: "inline-block",
      height: 188,
      width: 150,
      padding: 0,
      margin: 10,
      backgroundColor:"FFF",
      boxShadow: "0px 5px 1px #DCDCDC"
    };
    return (
      <div style={cardStyle}>
        <Square color={this.props.color} image={this.props.image}/>
        <Label colorL={this.props.colorL} name={this.props.name}/>
      </div>
    );
  }
}

// ReactDOM.render (
//   <div>
//     <Card color="Webpack" color="#FFA737" image={'media/webpack.svg'}/>
//     <Card color="#FFA737" colorL="#2B2B2B" name="React" image={'media/React-icon.svg'}/>
//     <Card name="Jsx" image={'media/jsx.png'}/>
//   </div>,
//   homePageContent
// );

  // Eric
  class ArtGallery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        requestFailed: false
      };
    }

    componentDidMount() {
      var artistName = this.props.match.params.artistName;
      var artArr = [];

      if (artistName == 'AdriaenCoorte') {
        artistName = 'coorte';
      }

      if (artistName == 'WillemClaesz') {
        artistName = 'willem&nbsp;claesz';
      }

      if (artistName == 'FlorisClaesz') {
        artistName = 'floris&nbsp;claesz';
      }

      fetch("https://www.rijksmuseum.nl/api/en/collection?key=OTlO83oj&format=json&q="
      + artistName + "&s=relevance" + "&ps=" + 5)

        .then(function(response) {
          if (!response.ok) {
            throw Error('Network request failed');
          }
          return response.json();
        })
        .then(function(result) {
          //console.log(result);

          var artObjects = result.artObjects;

          for (var i = 0; i < artObjects.length; i++) {
            artArr.push(artObjects[i]);
          }

          this.setState({artArray: artArr});
        }.bind(this), () => {
          this.setState({requestFailed: true});
        });
    }

    render() {
      if (!this.state.artArray) {
        return <p>Loading...</p>
      } else if (this.state.requestFailed || this.state.artArray.length == 0) {
        return <p>Could not find what you seek</p>
      } else {

        return <div id="artistArtGallery">{
          this.state.artArray.map(function(value, index) {
            return <div key={index}>
              {createImage(value.webImage)}
              <PaintingInfo id={value.objectNumber}></PaintingInfo>
            </div>
          })
        }</div>
      }
    }
  }

  function createImage(webImage) {

    if (webImage != null) {
      var image = "url(" + webImage.url.replace("s0", "s128") + ")";

      return <div id="painting" style={{backgroundImage: image}}
      onClick={function functionName() {
        var parrotBox = document.querySelector('#box1 > .bg-image');
        parrotBox.style.backgroundImage = image;
      }}></div>
    } else {
      return <p>No image available</p>
    }
  }

  class PaintingInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        requestFailed: false
      };
    }

    componentDidMount() {

      fetch("https://www.rijksmuseum.nl/api/EN/collection/"
      + this.props.id + "?key=OTlO83oj&format=json" + "&ps=" + 5)

        .then(function(response) {
          if (!response.ok) {
            throw Error('Network request failed');
          }
          return response.json();
        })
        .then(function(result) {
          //console.log(result);
          var artObject = result.artObject;

          this.setState({
            title: artObject.longTitle,
            maker: artObject.principalMaker,
            locationOfPiece: artObject.location,
            plaqueDescription: artObject.plaqueDescriptionEnglish
          });
        }.bind(this), () => {
          this.setState({requestFailed: true});
        });
    }

    render() {
      if (this.state.requestFailed) {
        return <p>Failed to get painting</p>
      } else {
        var title = this.state.title;
        var maker = this.state.maker;
        var location = this.state.locationOfPiece;
        var description = this.state.plaqueDescription;
        return <p>
          {'Title: ' + (title ? title:'Unavailable')}
          <br/>
          {'Maker: ' + (maker ? maker:'Unavailable')}
          <br/>
          {'Where to find: ' + (location ? location:'Unavailable')}
          <br/>
          {'Description: ' + (description ? description:'Unavailable')}
        </p>
      }
    }
  }

  // Petteri
  class Art extends React.Component {
    render() {
        var artists = [['rembrandt','Rembrandt'],['monet','Claude Monet'],
        ['picasso','Pablo Picasso'],['edgardegas','Edgar Degas'],
        ['vermeer','Johannes Vermeer'],['vangogh','Vincent van Gogh'],
        ['michelangelo','Michelangelo The Incredible'],['davinci','Lenardo da Vinci'],
        ['AdriaenCoorte','Adriaen Coorte'],['WillemClaesz','Willem Claesz'],
        ['FlorisClaesz','Floris Claesz']]


      var renderValues = artists.map(function (value) {
        var img = "Painters/"+value[0] + ".jpeg";
        var routeValue = "art/"+value[0];
        return <Link to={routeValue} key={value[0]} ><Card color="lightgrey" colorL="#FFC983" name={value[1]} image={img}/></Link>
      })

        return <section id="artList" >
        <h1>Artists</h1>
        <div>{renderValues}</div>

        </section>
    }
  }

  //Milja
  var PLANNER_API_KEY = 'hXNnSkBw';

  class Planner extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        today: moment(new Date()).format('YYYY-MM-DD'),
        calendarDate: moment(new Date()).format('YYYY-MM-DD'),
        time: 0,
        events: [],
        allEvents: []
      };
      this.onChange = this.onChange.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
      console.log('mounted');
      var chosenDate = this.state.today;
      var EVENT_API = 'https://www.rijksmuseum.nl/api/en/agenda/'+chosenDate+'?key='+PLANNER_API_KEY+'&format=json';

      fetch(EVENT_API)
        .then(response => response.json())
        .then(result => {console.log(result)
          // var allEvents = result.options;
          this.setState({allEvents: result.options});
        }
      );
    }

    onChange(event){
      var momentt = moment(event.target.value).format('YYYY-MM-DD');
      this.setState({ calendarDate: momentt });
      var PICKED = momentt;
      var API = 'https://www.rijksmuseum.nl/api/en/agenda/'+PICKED+'?key='+PLANNER_API_KEY+'&format=json';

      fetch(API)
        .then(response => response.json())
        .then(result => {console.log(result)
        //  var allEvents = result.options;
          this.setState({allEvents: result.options});
        }
      );
    }

    render(){
      // moment.tz.add('Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5');

      //Kan flyttas till CSS senare
      var border = {padding: 1, border: 1, borderStyle: 'dotted'};

      var eventsToDisplay = this.state.allEvents.map((event, index) => {
      //  var s = moment(event.period.startDate);
        var available = <a href={event.links.web}>Book</a>;

          moment().calendar((event.period.startDate), {
            sameDay: function(now) {
              if (this.isBefore(now)){
                return console.log('will  happen today');
              } else {
                console.log('happened today');
                available = 'Event has passed.';
                return 'Event has passed.';
              }
            }
          });

      //  var timeLeft = moment().diff(event.period.startDate, 'days');
        console.log('timeleft: ' + moment(event.period.startDate).diff(moment(), 'days'));
        return <tr key={index}><td>{event.period.text}</td><td>{event.exposition.name}</td><td>{available}</td></tr>;
      });

      return <div >
      <form><input type="date" min={this.state.today} onChange={this.onChange}/></form>
      <br />
      <table style={border}>
      <tbody>
      <tr><th>{this.state.calendarDate}</th></tr>
      <tr>
        <th>Time</th>
        <th>Event</th>
        <th>Tickets</th>
      </tr>
        { eventsToDisplay }
      </tbody>
      </table>
      </div>
    }
  }



  var HashRouter = ReactRouterDOM.HashRouter; var Link = ReactRouterDOM.Link; var Route = ReactRouterDOM.Route; ReactDOM.render(

  <HashRouter>
    <div>
      <nav id="navigation">
        <ul id="navUl">
          <li id="navLi">
            <Link to="/">Home</Link>
          </li>
          <li id="navLi">
            <Link to="/art">Art</Link>
          </li>
          <li id="navLi">
            <Link to="/planner">Planner</Link>
          </li>
          <li id="navLi">
            <Link to="/cafe">Cafe</Link>
          </li>
        </ul>
      </nav>
      <Route exact={true} component={Home} path="/"   />
      <Route exact={true} component={Art} path="/art"   />
      <Route component={ArtGallery} path="/art/:artistName" />
      <Route exact={true} component={Planner} path="/planner" />
      <Route path="/cafe" />
    </div>
  </HashRouter>, document.getElementById('box2'));


  //CAFE

  // Menu Card component
  class MenuSquare extends React.Component {
    render() {
      var squareStyle = {
        height: 120,
        backgroundColor: this.props.color,
        backgroundImage: "url("+this.props.image+")",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };
      return (
        <div style={squareStyle}></div>
      );
    }
  }
  class MenuLabel extends React.Component {
    render() {
      var labelStyle = {

        fontWeight: "bold",
        backgroundColor: this.props.colorL,
        padding: 13,
        height: 30,
        margin: 0
      };
      return (
        <p style={labelStyle}>{this.props.name}</p>
      );
    }
  }
  class MenuCard extends React.Component {
    render() {
      var cardStyle = {
        display: "inline-block",
        height: 150,
        width: 120,
        padding: 0,
        margin: 10,
        backgroundColor:"FFF",
        boxShadow: "0px 5px 1px #DCDCDC"
      };
      return (
        <div style={cardStyle}>
          <Square color={this.props.color} image={this.props.image}/>
          <Label colorL={this.props.colorL} name={this.props.name}/>
        </div>
      );
    }
  }

  var MENU_ID = 111;
  var cafeMenu =
  [
    {
      name: "Espresso",
      population: 0,
      price: 2.10,
      sugar: false
    },
    {
      name: "Drip Coffee",
      population: 0,
      price: 2.20,
      sugar: false
    },
    {
      name: "Cold Brew",
      population: 0,
      price: 3.00,
      sugar: false
    },
    {
      name: "Ice Tea",
      population: 0,
      price: 2.95,
      sugar: false
    },
    {
      name: "Hot Tea",
      population: 0,
      price: 2.95,
      sugar: false
    },
    {
      name: "Cappuccino",
      population: 0,
      price: 2.85,
      sugar: false
    },
    {
      name: "Latte",
      population: 0,
      price: 2.95,
      sugar: false
    },
    {
      name: "Americano",
      population: 0,
      price: 2.40,
      sugar: false
    }
  ];

  //POST request + create menu items
  function postMenu(){
    fetch('http://cities.jonkri.se/', {
      body: JSON.stringify({cafeMenu, id: MENU_ID}),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json())
      .then(result => {
        console.log(result);
/*
        var renderCards = cafeMenu.map(function (value, index) {
          var img = value.name;
          return <MenuCard id={index} color="lightgrey" colorL="#FFC983" name={value.name} image={img}/>
        })
        ReactDOM.render(<section id="cafeMenu">
          <h1>MENU</h1>
          <div>{renderCards}</div>
        </section>, document.getElementById('box2'));
*/
      });
  }

  // function updateOrder(){
  //   fetch('http://cities.jonkri.se/'+MENU_ID, {
  //     body: JSON.stringify({ EDITEDMENU }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'PUT'
  //   }).then(response => response.json())
  //     .then(result => {
  //       console.log(result);
  //     });
  // }
