import axios from "axios";
import { ICatResponse } from "../types/cat";

export default class CatService {
  private readonly BASE_URL = "https://cataas.com/";

  public async getRandomCat(): Promise<ICatResponse> {
    const { data } = await axios.get(`${this.BASE_URL}cat?json=true`);

    // Cache needs an id property.
    data.id = `cat_${data._id}`;

    // Reformat the URL so it actually points to the image.
    data.url = `${this.BASE_URL}cat/${data.id.split("_")[1]}.${
      data.mimetype.split("/")[1]
    }`;

    return data;
  }
}
