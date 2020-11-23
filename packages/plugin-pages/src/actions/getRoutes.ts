import Database from '@nocobase/database';
import { ResourceOptions } from '@nocobase/resourcer';
import { flatToTree } from '../utils';
import { get } from 'lodash';

function pages2routes(pages: Array<any>) {
  let routes: any = {};
  pages.forEach(page => {
    const { children = [], ...restProps } = page;
    const route: any = {
      ...restProps,
    };
    if (page.type === 'layout' && !page.redirect && children.length) {
      const items = children.sort((a, b) => a.order - b.order);
      const segmentId = get(items, [0, 'segments', 0, 'id']);
      route.redirect = segmentId ? `${items[0].path}/segments/${segmentId}` : items[0].path;
    }
    if (page.type === 'layout' && children.length) {
      route.menu = children.map(child => ({
        ...child,
        title: child.title,
        path: child.path,
        order: child.order,
      }));
    }
    if (page.children) {
      routes = {...routes, ...pages2routes(page.children)};
    }
    routes[page.path] = route;
  });
  return routes;
}

export default async function getRoutes(ctx, next) {
  const database: Database = ctx.database;
  const Page = database.getModel('pages');
  let pages = await Page.findAll({
    order: [['sort', 'asc']],
  });
  const data = flatToTree(pages.map(row => row.toJSON()), {
    id: 'id',
    parentId: 'parent_id',
    children: 'children',
  });
  ctx.body = pages2routes(data);
  await next();
}