/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import card from './card.css';
import carousel from './carousel.css';

class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: [],
    };
    // this.prev = this.prev.bind(this);
    // this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // axios.get('/products/${current product id}/related')
    // original #48432
    axios.get('/products/48439/related')
      .then((res) => {
        const relatedIds = res.data;
        const ids = [];
        for (let i = 0; i < relatedIds.length; i++) {
          const relatedId = relatedIds[i];
          ids[i] = { relatedId };
        }
        this.setState({
          productInfo: ids,
        });
        const { productInfo } = this.state;
        for (const id in productInfo) { // [{relatedId: 48433}, {…}, {…}, {…}]
          const { relatedId } = productInfo[id]; // [48433, 48434, 48439, 48438]
          axios.get(`/products/${relatedId}`)
            .then((res) => {
              for (let j = 0; j < productInfo.length; j++) {
                if (productInfo[j].relatedId === res.data.id) {
                  productInfo[j] = { category: res.data.category, ...productInfo[j] };
                  productInfo[j] = { features: res.data.features, ...productInfo[j] };
                }
              }
              this.setState({
                productInfo,
              });
            });
          axios.get(`/products/${relatedId}/styles`)
            .then((res) => {
              for (let k = 0; k < productInfo.length; k++) {
                if (productInfo[k].relatedId === Number(res.data.product_id)) {
                  productInfo[k] = { name: res.data.results[0].name, ...productInfo[k] };
                  productInfo[k] = { price: res.data.results[0].original_price, ...productInfo[k] };
                  productInfo[k] = { sale: res.data.results[0].sale_price, ...productInfo[k] };
                  productInfo[k] = {
                    pic: res.data.results[0].photos[0].thumbnail_url, ...productInfo[k],
                  };
                }
              }
              this.setState({
                productInfo,
              });
            });
        }
      });
  }

  // prev() {

  // }

  // next() {

  // }

  render() {
    const { productInfo } = this.state;
    if (productInfo.length === 0) {
      return 'loading...';
    }
    return (
      <div className="carousel">
        <div>RELATED PRODUCTS</div>
        <button className="carousel__button carousel__button--left" type="button">
          <img src="./images/arrow-left.png" alt="" />
        </button>

        <div className="carousel__track-container">
          {productInfo.map((product, i) => (

            <ul className="carousel__track">

              <li className="carousel__slide">
                <div className="card">
                  <img className="cardImage" src={product.pic} alt="" />
                  <dl className="cardCategory">{product.category}</dl>
                  <dl className="cardTitle">{product.name}</dl>
                  <dl className="cardPrice">${product.price}</dl>
                  <dl className="cardRating">* star placeholder *</dl>
                </div>
              </li>

            </ul>

          ))}
        </div>

        <button className="carousel__button carousel__button--right" type="button">
          <img src="./images/arrow-right.png" alt="" />
        </button>
      </div>
    );
  }
}

export default ProductCarousel;

{/* <li className="carousel__slide">
  <img className="carousel__image" src="https://bit.ly/3hFxW3E" alt="" />
</li> */}

// return (
//   <>
//     {productInfo.map((product, i) => (
//       // eslint-disable-next-line react/no-array-index-key
//       <div className="column" key={i}>
//         <div className="card">
//           <img className="cardImage" src={product.pic} alt="related product" />
//           <ul className="cardCategory">{product.category}</ul>
//           <ul className="cardTitle">{product.name}</ul>
//           <ul className="cardPrice">${product.price}</ul>
//           <ul className="cardRating">* star placeholder *</ul>
//         </div>
//       </div>
//     ))}
//   </>
// );