// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(warnings, unused)]
mod db;

use db::*;
use std::sync::Arc;
use tauri::State;
use tauri_specta::ts;
use specta::collect_types;

type DbState<'a> = State<'a, Arc<PrismaClient>>;

#[tokio::main]
async fn main() {
  let _db = PrismaClient::_builder().build().await.unwrap();
  let _ = ts::export(collect_types![get_account], "../types/bindings.ts");

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
#[specta::specta]
async fn get_account(_db: DbState<'_>) -> Result<bool, ()> {
  // db.account()
  //   .find_first(vec![])
  //   .exec()
  //   .await
  //   .unwrap();
  Ok(true)
}