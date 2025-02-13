use super::super::crypto::did::ShortDidValue;
use super::constants::GET_DDO;

#[derive(Serialize, PartialEq, Debug)]
pub struct GetDdoOperation {
    #[serde(rename = "type")]
    pub _type: String,
    pub dest: ShortDidValue,
}

impl GetDdoOperation {
    pub fn new(dest: ShortDidValue) -> GetDdoOperation {
        GetDdoOperation {
            _type: GET_DDO.to_string(),
            dest,
        }
    }
}
