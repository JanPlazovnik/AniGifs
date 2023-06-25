import axios from "axios";
import { ICatResponse } from "../types/cat";

export default class CatService {
  private readonly BASE_URL = "https://cataas.com/";

  public async getRandomCat(): Promise<ICatResponse> {
    const { data } = await axios.get(`${this.BASE_URL}cat?json=true`);
    return data;
  }
}
