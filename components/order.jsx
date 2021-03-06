var React = require('react')
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var MenuCard = require('./menucard.jsx');
var Redux = require('redux');
var ReactRedux = require('react-redux');

class Order extends React.Component{
  render() {
    var drinksOrdered = Object.values(this.props.menu).filter((drink) => drink.cups > 0);
    var total = drinksOrdered.reduce((total, drink) => total + (drink.price*drink.cups), 0);
    return <div id="placeOrder"><table>
      <tbody>
        <tr>
          <th>YOUR CURRENT ORDER</th>
          <th>TOTAL: { total.toFixed(2) } euros</th>
          <th><input type='button' onClick={this.props.placeOrder} value="Place Order" />
          </th>
        </tr>
        <tr><th>Drink</th><th>Sugar</th><th>Amount</th></tr>
        {drinksOrdered.map(function (drink) {
          return <tr key={drink.name}>
            <td>{drink.name}</td>
            <td>{drink.sugar ? 'yes' : 'no'}</td>
            <td>{drink.cups} cups</td>
          </tr>;
        })}
      </tbody>
    </table>
    </div>
  }
}

var ConnectedOrder = ReactRedux.connect(
  function (state) {
    return { menu: state.menu };
  },
  function(dispatch){
    return {
      placeOrder: () => {
        return dispatch({
          type: 'PLACE_ORDER'
        })
      }
    };
  })(Order);

module.exports = ConnectedOrder;
