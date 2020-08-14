import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { manifestHelper } from './manifestHelper';
import { paths } from '../../config/paths';
import { webpackDevServer } from './webpackDevServer';

const isDev = process.env.NODE_ENV === 'development';

export const middlewares = async (app: Express) => {
  if (isDev) {
    webpackDevServer(app);
  }

  // add secured http headers
  app.use(helmet());

  // log requests basic info
  app.use(morgan('dev'));

  // body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  // handle static files via nginx server.
  if (isDev) {
    app.use(express.static(paths.build));
  }

  // help to read and parse manifest file to get assets paths.
  app.use(manifestHelper(paths.manifest));

  app.use((req, res, next) => {
    res.locals.meta = {
      defaultTitle: 'Mahmoud Ashraf',
      defaultDescription: "Mahmoud Ashraf's sapce on the internet.",
    };

    const { assetPath } = res.locals;

    const styles = [assetPath('app.css')];
    const scripts = [assetPath('app.js'), assetPath('vendor.js')];

    res.locals.styles = styles;
    res.locals.scripts = scripts;

    res.locals.cookies = req.cookies;

    next();
  });
};
