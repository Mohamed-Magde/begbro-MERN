import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "./../auth/auth-helper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "./api-product.js";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
  buttonSubmit: {
    color: "#fff",
    backgroundColor: "#02163B",
  },
}));

export default function NewProduct({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    redirect: false,
    error: "",
    age: "",
    rooms: "",
    floor: "",
    bathrooms: "",
    balcony: false,
    furniture: false,
    sale: false,
    rent: false,
  });
  const jwt = auth.isAuthenticated();
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.image && productData.append("image", values.image);
    values.category && productData.append("category", values.category);
    values.age && productData.append("age", values.age);
    values.floor && productData.append("floor", values.floor);
    values.bathrooms && productData.append("bathrooms", values.bathrooms);
    values.rooms && productData.append("rooms", values.rooms);
    values.balcony && productData.append("balcony", values.balcony);
    values.furniture && productData.append("furniture", values.furniture);
    values.sale && productData.append("sale", values.sale);
    values.rent && productData.append("rent", values.rent);
    values.quantity && productData.append("quantity", values.quantity);
    values.price && productData.append("price", values.price);

    create(
      {
        shopId: match.params.shopId,
      },
      {
        t: jwt.token,
      },
      productData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/seller/shop/edit/" + match.params.shopId} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Yeni Ürünü
          </Typography>
          <br />
          <input
            accept="image/*"
            onChange={handleChange("image")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              component="span"
            >
              Fotoğraf yükle
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {values.image ? values.image.name : ""}
          </span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={values.description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="category"
            label="Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange("category")}
            margin="normal"
          />
          <br />
          <TextField
            id="age"
            label="age"
            className={classes.textField}
            value={values.age}
            onChange={handleChange("age")}
            margin="normal"
          />
          <br />{" "}
          <TextField
            id="rooms"
            label="rooms"
            className={classes.textField}
            value={values.rooms}
            onChange={handleChange("rooms")}
            margin="normal"
          />
          <br />{" "}
          <TextField
            id="floor"
            label="floor"
            className={classes.textField}
            value={values.floor}
            onChange={handleChange("floor")}
            margin="normal"
          />
          <br />{" "}
          <TextField
            id="bathrooms"
            label="bathrooms"
            className={classes.textField}
            value={values.bathrooms}
            onChange={handleChange("bathrooms")}
            margin="normal"
          />
          <br />
          <TextField
            id="quantity"
            label="Quantity"
            className={classes.textField}
            value={values.quantity}
            onChange={handleChange("quantity")}
            type="number"
            margin="normal"
          />
          <br />
          <TextField
            id="price"
            label="Price"
            className={classes.textField}
            value={values.price}
            onChange={handleChange("price")}
            type="number"
            margin="normal"
          />
          <br />
          <div className="form-group">
            <label htmlFor="balcony">
              <input type="checkbox" id="balcony" value={values.balcony} />
              Balcony
            </label>
            <label htmlFor="furniture">
              <input type="checkbox" id="furniture" value={values.furniture} />
              Furniture
            </label>
            <label htmlFor="sale">
              <input type="checkbox" id="sale" value={values.sale} />
              Sale
            </label>
            <label htmlFor="rent">
              <input type="checkbox" id="rent" value={values.rent} />
              Rent
            </label>
          </div>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Sunmak
          </Button>
          <Link
            to={"/seller/shop/edit/" + match.params.shopId}
            className={classes.submit}
          >
            <Button variant="contained">İptal Et</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
