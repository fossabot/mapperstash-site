const mariadb = require('mariadb')
const config = require('./config.json')

console.log('Creating database')

;(async _ => {
    const conn = await mariadb.createConnection(config.mariadb)
    await conn.query('create database mapperstash')
    await conn.query('use mapperstash')
    await conn.query('create table tags (id int auto_increment, tag varchar(128), primary key (id))')
    await conn.query('create table impliedtags (implier int not null, implied int not null)')
    await conn.query('create table items (id int auto_increment, name text, url text not null, primary key (id))')
    await conn.query('create table itemtags (itemid int not null, tagid int not null)')
    await conn.query('create table users (id int auto_increment, name varchar(128), pass char(60), primary key (id))')
    conn.end()
})()
