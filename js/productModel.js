export class Product {
  constructor(productHash) {
    this.infos = productHash;
  }

  id() {
    return this.infos._id;
  }

  name() {
    return this.infos.name;
  }

  description() {
    return this.infos.description;
  }

  price() {
    return this.infos.price / 100;
  }

  image() {
    return this.infos.imageUrl;
  }

  varnish() {
    return this.infos.varnish;
  }

  numberOfVarnish() {
    return this.varnish().length;
  }

  //sérialisation des instances de la classe Product, pour pouvoir les sauvegarder dans le localStorage
  toJSON() {
    return this.infos;
  }
}
