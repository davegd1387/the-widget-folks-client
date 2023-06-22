const Product = (props) => {
  const { itemId, prodName, desc, price } = props;
  return (
    <>
      <div className="product" key={itemId}>
        <div>
          <h3 className="product--h3">{prodName}</h3>
          <p className="product--price">Price: ${price}</p>
        </div>
        <p>{desc}</p>
      </div>
    </>
  );
};

export default Product;
