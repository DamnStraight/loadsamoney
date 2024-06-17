// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(warnings, unused)]
mod db;

use db::*;
use prisma_client_rust::QueryError;
use serde::Deserialize;
use std::{sync::Arc, vec};
use tauri::State;
use tauri_specta::ts;
use specta::{collect_types, Type};

type DbState<'a> = State<'a, Arc<PrismaClient>>;

#[tokio::main]
async fn main() {
  let db = PrismaClient::_builder().build().await.unwrap();
  let _ = ts::export(
    collect_types![add_account, get_account, get_all_users], 
    "../types/bindings.ts"
  );

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      add_account,
      get_account,
      get_all_users
    ])
    .manage(Arc::new(db))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[derive(Deserialize, Type)]
struct CreateAccountData {
  account_type: String,
  name: String,
  amount: f64,
}

#[tauri::command]
#[specta::specta]
async fn get_all_users(db: DbState<'_>) -> Result<Vec<user::Data>, QueryError> {
  db.user()
    .find_many(vec![])
    .exec()
    .await
}

#[tauri::command]
#[specta::specta]
async fn add_account(db: DbState<'_>, data: CreateAccountData) -> Result<account::Data, ()> {
  db.account()
    .create(data.account_type, data.name, data.amount, vec![])
    .exec()
    .await
    .map_err(|_| ())
}

#[tauri::command]
#[specta::specta]
async fn get_account(db: DbState<'_>) -> Result<account::Data, ()> {
  let res = db.account()
    .find_first(vec![])
    .exec()
    .await
    .unwrap()
    .unwrap();

  Ok(res)
}

#[tauri::command]
#[specta::specta]
async fn get_accounts(db: DbState<'_>) -> Result<Vec<account::Data>, ()> {
  let res = db.account()
    .find_many(vec![])
    .exec()
    .await
    .unwrap();

  Ok(res)
}