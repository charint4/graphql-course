// db
import db from "../../_db";
import { GameModel } from "../models/Game";
import { AuthorModel } from "../models/Author";
import { ReviewModel } from "../models/Review";
 
const Query = {
  async games() {
    return await GameModel.find();
  },
  async game(_: any, args: { id: string }) {
    return await GameModel.findById(args.id);
  },
  async reviews() {
    return await ReviewModel.find();
  },
  async review(_: any, args: { id: string }) {
    return await ReviewModel.findById(args.id);
  },
  async authors() {
    return await AuthorModel.find();
  },
  async author(_: any, args: { id: string }) {
    return await AuthorModel.findById(args.id);
  },
};

const Game = {
  async reviews(parent: any) {
    return await ReviewModel.find({ game_id: parent._id });
  },
};

const Author = {
  async reviews(parent: any) {
    return await ReviewModel.find({ author_id: parent._id });
  }
};

const Review = {
  async author(parent: any) {
    return await AuthorModel.findById(parent.author_id);
  },
  async game(parent: any) {
    return await GameModel.findById(parent.game_id);
  }
};

const Mutation = {
  async deleteGame(_: any, args: { id: string }) {
    await GameModel.findByIdAndDelete(args.id);
    
    return await GameModel.find();
  },
  async addGame(
    _: any,
    args: { game: { title: string; platform: string[] } }
  ) {
    const game = await GameModel.create({
      title: args.game.title,
      platform: args.game.platform,
    });

    return game;
  },
  async updateGame(
    _: any,
    args: { id: string; update: { title?: string; platform?: string[] } },
  ) {
    const updatedGame = await GameModel.findByIdAndUpdate(args.id, args.update, { new: true });
    return updatedGame;
  },
};

export const resolvers = {
  Query,
  Game,
  Author,
  Review,
  Mutation,
};
