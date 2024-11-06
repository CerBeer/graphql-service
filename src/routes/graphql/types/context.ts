import { PrismaClient } from '@prisma/client';
import { User } from './user.js';
import { Profile } from './profile.js';
import { Post } from './post.js';
import { Member } from './member.js';
import DataLoader from 'dataloader';

export type Context = {
  prisma: PrismaClient;
  dataLoaders: DataLoaders;
};

export type ID = {
  id: string,
};

export type RootObject = User | Profile | Post | Member;

export type DataLoaders = WeakMap<WeakKey, DataLoader<unknown, unknown>>;
