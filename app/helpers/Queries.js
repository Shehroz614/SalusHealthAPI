const { gql } = require('graphql-request');
const GQL_zoomSdkJwt = gql`
query zoomSdkJwt {
  zoomSdkJwt
    {
      __typename
    }  }

`;
const GQL_SIGN_IN = gql`
mutation signIn($username: String,
$email: String,
$password: String,
$token: String,
$timezone: String, 
$reset_token: String,
$namespace: String,
$generate_api_token: Boolean
) 
{ 
  signIn(input: 
    {username: $username,
      email: $email,
      password: $password, 
      token: $token, 
      timezone: $timezone,
      reset_token: $reset_token,
      namespace: $namespace,
    generate_api_token: $generate_api_token
    })
  { api_key,
     token ,
    user {id email first_name last_name is_patient},
    blocked_by_2fa ,clientMutationId,
    messages {      message   
      field      __typename    }    __typename  }}
`;

const GQL_SIGN_IN_USER_DATA = gql`
query beaconUserQuery ($can_be_scheduled_with :Boolean)
{  currentUser
  {  
    id   
    full_name 
    first_name
    last_name
    timezone
    phone_number
    providers( can_be_scheduled_with: $can_be_scheduled_with){ id}
    notification_setting { id }
    kustomer_api_key  
    avatar_url
    email    helpscout_hash    is_patient 
    num_entries    phone_number  
    stripe_id    subscription {   
      id      plan_name      stripe_id  
      __typename    } 
    next_onboarding_step {     
      id      item_type      __typename    }
    dietitian {      id  
      full_name 
      __typename    }  
      appointment_type_credits {id quantity appointment_type_id}
      credit_balance
    organization {      id      name  
      parent_organization {  
        id        name        __typename      }      __typename    }    __typename  }}

`;

const GQL_FORGOT_PASSWORD = gql`mutation resetPassword(
  $email: String,
  $namespace: String,
  $clientMutationId : String,
) 
  { 
    resetPassword(input: 
      {
        email: $email,
        namespace: $namespace,
        clientMutationId: $clientMutationId
      })
    { clientMutationId
      messages {      message   
        field      __typename    }    __typename  }}
`
const GQL_UPDATE_USER = gql`mutation updateUser(
  $name: String,
  $first_name: String,
  $last_name: String,
  $password: String,
  $password_confirmation: String,
  $id: ID,
$current_password: String,
$email : String,
$phone_number: String
$timezone: String
$avatar: Upload,
$avatar_string: String
) {
 updateUser(
    input: {
      name: $name,
      first_name: $first_name,
      id: $id,
      last_name: $last_name
          password: $password,
      password_confirmation: $password_confirmation,
      current_password: $current_password,
      email: $email,
      phone_number: $phone_number,
      avatar: $avatar,
      avatar_string: $avatar_string ,
      timezone:$timezone
    }
  ) {
   
    messages {
      field
      message
    }
  }
}`

const GQL_ALL_GOALS = gql`
query goalsData($user_id: ID, $offset: Int, $per_page: Int, $sort_by: String, $category: String, $keywords: String, $end_range: String, $rel_goal_id: String, $start_range: String!, $status_filter: String, $frequency_filter: String, $date_range_is_selected: Boolean!) {
  goalsData(offset: $offset, user_id: $user_id, sort_by: $sort_by, per_page: $per_page, category: $category, keywords: $keywords, end_range: $end_range, rel_goal_id: $rel_goal_id, start_range: $start_range, status_filter: $status_filter, frequency_filter: $frequency_filter) {
    goals_count
    daily_goals_count
    weekly_goals_count
    goals_streak_count
    all_time_goals_count
    one_time_goals_count
    completed_goals_count
    all_goals_status_count
    not_completed_goals_count
    all_goals_frequency_count
    goals_overall_completion_rate_info {
      percent
      __typename
    }
    goals {
      id
      name
      repeat
      due_date
      start_on
      created_at
      description
      subgoals_count
      created_user_id
      is_used_as_template
      title_link
    subgoals {id name description 
      is_completed_for_date(date: $start_range) }
      is_completed_for_date(date: $start_range) @skip(if: $date_range_is_selected)
      completion_percentage_for_range(start_range: $start_range, end_range: $end_range) @include(if: $date_range_is_selected)
      streak_info(start_range: $start_range, end_range: $end_range) {
        count
        start_date
        end_date
        __typename
      }
      user {
        id
        full_name
        __typename
      }
      __typename
      
    }
    __typename
  }
}
`


// variables : {id: "24615", completed_on: "2023-01-27"}
const GQL_DELETE_GOAL_HISTORY = gql`mutation deleteGoalHistory($id: ID, $completed_on: String)
{  deleteGoalHistory(input: {id: $id, completed_on: $completed_on})
{    goal_history {      id      __typename    }   
messages {      field      message      __typename    }    __typename
 }}
`

//variables : {user_id: "233293", goal_id: "24615", mark_parent_complete: false, completed_on: "2023-01-27"}

const GQL_CREATE_GOAL_HISTORY = gql`mutation createGoalHistory($user_id: String, $goal_id: String, $mark_parent_complete: Boolean, $completed_on: String)
{  createGoalHistory(input:
{user_id: $user_id, goal_id: $goal_id, mark_parent_complete: $mark_parent_complete, completed_on: $completed_on}) 
{    newGoalHistory: goalHistory {      ...GoalHistoryFragment      __typename    } 
  messages {      field      message      __typename    }    __typename  }}fragment GoalHistoryFragment on GoalHistory
{  id  user_id  goal_id  description  repeat  created_at  name  is_subgoal
 completed_on  goal {    parent_subgoal_completion_rate    __typename  }  __typename}

`

const GET_NOTIFICATIONS_SETTING = gql`query NotificationSetting($id: ID) {
  notificationSetting
(id: $id) {
    id
       send_goal_reminder_email
      send_email_on_appointment_book
      send_email_on_appointment_cancel
  }
}
`
const UPDATE_NOTIFICATIONS_SETTING = gql`mutation updateNotificationSetting(
  $id: ID,
 $send_email_on_appointment_cancel: Boolean,
 $send_email_on_appointment_book: Boolean,
 $send_goal_reminder_email: Boolean,
) {   updateNotificationSetting(input: {id: $id ,
   send_email_on_appointment_cancel : $send_email_on_appointment_cancel,
   send_email_on_appointment_book : $send_email_on_appointment_book,
   send_goal_reminder_email : $send_goal_reminder_email
  }) {     notificationSetting {       id   
     
      send_goal_reminder_email
      send_email_on_appointment_book
      send_email_on_appointment_cancel
    __typename     }   
    messages {       field       message       __typename     }  
    __typename   } } 

`

const GET_ALL_APPOINTMENTS = gql`query appointments(
  $user_id: ID,
  $filter: String,
  $sort_by: String,
  $should_paginate: Boolean,
  $offset: Int,
  $is_active: Boolean,
  $with_all_statuses: Boolean,
  $specificDay : String,
  
) {
  appointmentsCount(user_id: $user_id, filter: $filter, is_org: true, is_active: $is_active)
  appointments(
    is_active: $is_active,
    user_id: $user_id,
    filter: $filter,
    is_org: true,
    sort_by: $sort_by,
    should_paginate: $should_paginate,
    offset: $offset,
    with_all_statuses: $with_all_statuses,
    specificDay: $specificDay
  ) {
    id
    is_group
    date
    contact_type
    length
    location
    confirmed
    provider {
      id
      full_name
      avatar_url
    }

    appointment_type {
      name
      id
    }
zoom_join_url
    zoom_meeting_id
    zoom_start_url
    zoom_appointment {id participants_count }
    use_zoom
    attendees {
      id
      full_name
      first_name
      avatar_url
      phone_number
    }
  }
}
`


const GQL_DAYS_AVAILABLE = gql`query daysAvailableForRange(
  $provider_id: String
  $date_from_month: String
  $org_level: Boolean
  $timezone: String
  $provider_ids: [String]
  $appt_type_id: String
) {
  daysAvailableForRange(
    provider_id: $provider_id
    date_from_month: $date_from_month
    org_level: $org_level
    timezone: $timezone
    provider_ids: $provider_ids
    appt_type_id: $appt_type_id
  )
}`
const GQL_DAY_AVAILABLE_SLOTS = gql` query availableSlotsForRange(
  $provider_id: String
  $start_date: String
  $end_date: String
  $org_level: Boolean
  $timezone: String
  $provider_ids: [String]
  $appt_type_id: String
  $clients_can_join_waitlist : Boolean
  $contact_type : String
  $make_unique : Boolean
) {
  availableSlotsForRange(
    provider_id: $provider_id
    start_date: $start_date
    end_date: $end_date
    timezone: $timezone
    org_level: $org_level
    provider_ids: $provider_ids
    appt_type_id: $appt_type_id
    clients_can_join_waitlist: $clients_can_join_waitlist
    contact_type : $contact_type
    make_unique: $make_unique


  ) {
    user_id
    date
    appointment_id
    is_fully_booked
  }
}`

const GQL_Complete_CheckOut_Meeting = gql`
mutation completeCheckout(
    $appointment_type_id: String,
    $contact_type: String,
    $date: String,
    $first_name: String,
    $last_name: String,
    $email: String,
    $phone_number: String,
    $provider_id: String,
    $timezone: String,
  $appointment_id : String
  $is_joining_waitlist: Boolean
  
  ) {
    completeCheckout(
      input: {
        appointment_type_id: $appointment_type_id,
        contact_type: $contact_type,
        date: $date,
        timezone: $timezone,
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        phone_number: $phone_number,
        provider_id: $provider_id,
        appointment_id: $appointment_id,
        is_joining_waitlist: $is_joining_waitlist
      }
    ) {
      appointment {
        provider {
          id
          full_name
        }
        id
        date
        contact_type
        appointment_type {
          id
          name
          length
        }
      }
      messages {
        field
        message
      }
    }
  }
`

const GQL_Complete_CheckOut_Meeting_Update = gql`mutation updateAppointment($id: ID, $end_date: String, $end_time: String, $is_blocker: Boolean, $attendee_ids: String, $user_id: String, $appointment_type_id: String, $location: String, $date: String, $pm_status: String, $actual_duration: String, $client_confirmed: Boolean, $confirmed: Boolean, $is_zoom_chat: Boolean, $updateRecurring: Boolean, $time: String, $notes: String, $timezone: String, $contact_type: String, $max_attendees: String, $other_party_id: String, $room_id: String, $appointment_location_id: String, $external_videochat_url: String, $providers: String, $client_updating: Boolean, $attended_clients: [AttendedClientsInput!], $recurring_appointment: RecurringAppointmentInput, $appointment_inclusion_uuid: ID) {
  updateAppointment(input: {id: $id, timezone: $timezone, is_blocker: $is_blocker, attendee_ids: $attendee_ids, user_id: $user_id, end_date: $end_date, end_time: $end_time, max_attendees: $max_attendees, appointment_type_id: $appointment_type_id, location: $location, appointment_inclusion_uuid: $appointment_inclusion_uuid, date: $date, time: $time, notes: $notes, contact_type: $contact_type, actual_duration: $actual_duration, external_videochat_url: $external_videochat_url, pm_status: $pm_status, updateRecurring: $updateRecurring, client_confirmed: $client_confirmed, client_updating: $client_updating, attended_clients: $attended_clients, room_id: $room_id, confirmed: $confirmed, other_party_id: $other_party_id, appointment_location_id: $appointment_location_id, providers: $providers, is_zoom_chat: $is_zoom_chat, recurring_appointment: $recurring_appointment}) {
    appointment {
      ...ProviderAppointmentFragment
      __typename
    }
    messages {
      field
      message
      __typename
    }
    __typename
  }
}

fragment ProviderAppointmentFragment on Appointment {
  id
  is_group
  connected_chart_note_locked
  provider {
    id
    full_name
    first_name
    avatar_url
    phone_number
    devices_unavailability
    appointment_types {
      is_group
      name
      id
      __typename
    }
    appointment_setting {
      ask_clients_to_confirm
      id
      client_should_call_provider
      charge_for_occured_appts
      __typename
    }
    __typename
  }
  user {
    id
    phone_number
    __typename
  }
  providers {
    id
    full_name
    __typename
  }
  attendees {
    id
    full_name
    first_name
    last_name
    avatar_url
    phone_number
    user_group_id
    dietitian_id
    allow_community_chat
    allow_direct_chat
    doc_share_id
    devices_unavailability
    __typename
  }
  assigned_groups {
    id
    name
    __typename
  }
  attended_clients {
    id
    attended
    confirmed
    cancelled
    user_id
    __typename
  }
  appointment_type {
    id
    name
    id
    is_group
    is_waitlist_enabled
    __typename
  }
  form_answer_group {
    id
    name
    created_at
    custom_module_form {
      id
      name
      __typename
    }
    form_answer_group_users_connections {
      id
      user {
        id
        full_name
        __typename
      }
      __typename
    }
    __typename
  }
  appointment_category
  notes
  max_attendees
  recurring_appointment {
    id
    repeat_times
    repeat_interval
    join_all
    __typename
  }
  time_recurring_override
  connected_chart_note_string
  contact_type
  is_blocker
  length
  location
  date
  start
  end
  timezone_abbr
  other_party_id
  pm_status
  actual_duration
  confirmed
  session_id
  generated_token
  last_client_conversation_id
  conversation_id
  external_videochat_url
  use_zoom
  zoom_dial_in_info: zoom_dial_in_info_html
  zoom_join_url
  zoom_start_url
  appointment_location_id
  room_id
  client_confirmed
  external_id_type
  is_zoom_chat
  zoom_cloud_recording_urls
  reason
  current_position_in_recurring_series
  requested_payment {
    id
    status
    __typename
  }
  filled_embed_form {
    id
    created_at
    form_answers {
      label
      displayed_answer
      id
      custom_module {
        required
        id
        mod_type
        label
        __typename
      }
      __typename
    }
    __typename
  }
  attendees_on_waitlist {
    id
    full_name
    __typename
  }
  __typename
}`

const GQL_Delete_Appointment = gql`mutation deleteAppointment($id: ID, $deleteRecurring: Boolean) {
  deleteAppointment(input: { id: $id, deleteRecurring: $deleteRecurring }) {
    appointment {
      id
    }
    messages {
      field
      message
    }
  }
}`



const GQL_GET_ORGANIZATION = gql`query getOrganization($id: ID, $email: String,) {
  organizationMembership {
    org_role
    can_see_clients
    can_edit_members
    can_add_members
    can_see_calendar
    can_see_docs
    is_admin
    id
    show_availability_first
    selected_statuses_filter
    selected_tags_filter
    selected_licensed_in_filter
    selected_locations_filter
    __typename
  }
  tags(applied_to_providers: true) {
    id
    name
    __typename
  }
  organization(id: $id, email: $email) {
    id
    owner_id
    name
    phone_number
    org_roles
    onboarding_flow_id
    parent_organization_id
    can_have_suborgs
    state_licenses
    organization_info {
      id
      phone_number
      name
      npi
      tax_id
      tax_id_type
      location {
        id
        line1
        line2
        city
        country
        zip
        state
        __typename
      }
      __typename
    }
    only_active_providers {
      id
      full_name
      timezone
      calendar_timezone
      first_name_last_initial
      avatar_url
      notification_setting {
        id
        send_new_clients_emails
        __typename
      }
  
   
      __typename
    }
 
    
    active_care_team_members {
      id
      full_name
      __typename
    }
    __typename
  }
}
`
const GQL_GET_appointmentTypesData = gql`query appointmentTypes($offset: Int, $keywords: String, $provider_id: String, $provider_ids: [String], $org_level: Boolean, $appointment_type_ids: String, $show_group: Boolean, $should_paginate: Boolean, $offering_id: String, $clients_can_book: Boolean, $appointment_location_id: String, $user_id: ID, $client_state_of_residence: String, $embed_or_sharing_link: Boolean) {
  appointmentTypesCount(keywords: $keywords, provider_id: $provider_id, appointment_type_ids: $appointment_type_ids, org_level: $org_level, show_group: $show_group, offering_id: $offering_id, clients_can_book: $clients_can_book, embed_or_sharing_link: $embed_or_sharing_link)
  appointmentTypes(offset: $offset, keywords: $keywords, provider_id: $provider_id, appointment_type_ids: $appointment_type_ids, show_group: $show_group, should_paginate: $should_paginate, org_level: $org_level, offering_id: $offering_id, clients_can_book: $clients_can_book, embed_or_sharing_link: $embed_or_sharing_link) {
    id
    name
    length
    clients_have_credit
    client_call_provider
    availability_exists_for(provider_id: $provider_id, org_level: $org_level, provider_ids: $provider_ids, appointment_location_id: $appointment_location_id)
    valid_state_licensing_for(provider_id: $provider_id, org_level: $org_level, provider_ids: $provider_ids, client_state_of_residence: $client_state_of_residence)
    available_contact_types
    is_group
    is_waitlist_enabled
    require_in_state_clients
    __typename
  }
  user(id: $user_id) {
    id
    phone_number
    __typename
  }
}

`

// const GQL_GET_appointmentTypesData = gql`query appointmentTypes($provider_id: String,  $org_level: Boolean, $show_group: Boolean, $clients_can_book: Boolean, ) {
//   appointmentTypes( provider_id: $provider_id, show_group: $show_group,  org_level: $org_level,  clients_can_book: $clients_can_book,) {
//     id
//     name
//     length
//     clients_have_credit
//     client_call_provider
//     available_contact_types
//     is_group
//     is_waitlist_enabled
//     require_in_state_clients
//     __typename
//   }
// }
// `
//{
//   "clients_can_book": true,
//   "org_level": false,
//   "provider_id": "2034228",
//   "provider_ids": null
// }

const GQL_Conversation_Membership = gql`query conversationMemberships($offset: Int, $keywords: String, $active_status: String, $client_id: String, $read_status: String, $conversation_type: String, $provider_id: ID, $notes_type: String, $is_scheduled_tab: Boolean!, $org_chat: Boolean, $provider_ids: [ID]) {
  showScheduledTab
  conversationMembershipsCount(keywords: $keywords, active_status: $active_status, client_id: $client_id, read_status: $read_status, conversation_type: $conversation_type, provider_id: $provider_id, notes_type: \"inbox\", org_chat: $org_chat, provider_ids: $provider_ids)
  scheduledConvMembershipsCount: conversationMembershipsCount(keywords: $keywords, active_status: $active_status, client_id: $client_id, read_status: $read_status, conversation_type: $conversation_type, provider_id: $provider_id, notes_type: \"scheduled\", org_chat: $org_chat, provider_ids: $provider_ids)
  scheduledMessageBlasts(provider_id: $provider_id, org_chat: $org_chat, provider_ids: $provider_ids) @include(if: $is_scheduled_tab) {
    id
    updated_at
    note_content
    invitees_count
    last_task {
      ...NoteTaskFragment
      __typename
    }
    first_four_invitees {
      id
      full_name
      avatar_url
      active
      __typename
    }
    __typename
  }
  conversationMemberships(offset: $offset, keywords: $keywords, active_status: $active_status, client_id: $client_id, read_status: $read_status, conversation_type: $conversation_type, provider_id: $provider_id, notes_type: $notes_type, org_chat: $org_chat, provider_ids: $provider_ids) {
    ...ConversationMembershipPreviewFragment
    last_task(notes_type: $notes_type) {
      ...NoteTaskFragment
      __typename
    }
    __typename
  }
}

fragment ConversationMembershipPreviewFragment on ConversationMembership {
  id
  display_avatar
  display_name
  archived
  conversation_id
  conversation_role
  updated_at
  display_other_user_name
  display_other_user_first_name
  user_id
  viewed
  convo {
    id
    name
    owner {
      id
      full_name
      avatar_url
      __typename
    }
    last_message_content
    updated_at
    conversation_memberships_count
    community_chat_prefix
    is_hidden_for_client
    closed_date
    current_user_conversation_membership {
      id
      __typename
    }
    first_four_invitees {
      id
      full_name
      avatar_url
      active
      __typename
    }
    __typename
  }
  __typename
}

fragment NoteTaskFragment on Task {
  id
  completed_at
  content
  created_at
  creator {
    id
    full_name
    __typename
  }
  user {
    id
    full_name
    __typename
  }
  client {
    id
    full_name
    __typename
  }
  __typename
}

`
const GQL_GET_NOTES = gql`query notes($offset: Int, $keywords: String, $conversation_id: ID, $sort_by: String, $scheduled_notes: Boolean, $provider_id: ID, $org_chat: Boolean, $ids: [ID]) {
  notesCount(keywords: $keywords, conversation_id: $conversation_id, scheduled_notes: $scheduled_notes, provider_id: $provider_id, org_chat: $org_chat)
  notes(offset: $offset, keywords: $keywords, conversation_id: $conversation_id, sort_by: $sort_by, scheduled_notes: $scheduled_notes, provider_id: $provider_id, org_chat: $org_chat, ids: $ids) {
    ...NoteFragment
    __typename
  }
  taskNotes: notes(with_tasks: true, conversation_id: $conversation_id, scheduled_notes: $scheduled_notes, org_chat: $org_chat, provider_id: $provider_id) {
    ...NoteFragment
    __typename
  }
  loadMoreNotesCalled
}

fragment NoteFragment on Note {
  id
  content
  user_id
  conversation_id
  attached_image_url
  attached_audio_url
  document_id
  created_at
  updated_at
  is_autoresponse
  deleted_by_user
  scheduled_at
  image_name
  document_name
  on_behalf_user {
    id
    full_name
    avatar_url
    first_name_last_initial
    __typename
  }
  creator {
    id
    full_name
    avatar_url
    is_patient
    first_name_last_initial
    __typename
  }
  task {
    ...NoteTaskFragment
    __typename
  }
  __typename
}

fragment NoteTaskFragment on Task {
  id
  completed_at
  content
  created_at
  creator {
    id
    full_name
    __typename
  }
  user {
    id
    full_name
    __typename
  }
  client {
    id
    full_name
    __typename
  }
  __typename
}

`

const GQL_Create_Chat = gql`
mutation createNote($user_id: String, $content: String, $conversation_id: String, $attached_image: Upload, $attached_document: Upload, $attached_audio: Upload, $scheduled_at: String, $org_chat: Boolean, $hide_org_chat_confirmation: Boolean) {
  createNote(input: {user_id: $user_id, content: $content, conversation_id: $conversation_id, attached_image: $attached_image, attached_document: $attached_document, attached_audio: $attached_audio, scheduled_at: $scheduled_at, org_chat: $org_chat, hide_org_chat_confirmation: $hide_org_chat_confirmation}) {
    newNote: note {
      ...NoteFragment
      __typename
    }
    messages {
      field
      message
      __typename
    }
    __typename
  }
}

fragment NoteFragment on Note {
  id
  content
  user_id
  conversation_id
  attached_image_url
  attached_audio_url
  document_id
  created_at
  updated_at
  is_autoresponse
  deleted_by_user
  scheduled_at
  image_name
  document_name
  on_behalf_user {
    id
    full_name
    avatar_url
    first_name_last_initial
    __typename
  }
  creator {
    id
    full_name
    avatar_url
    is_patient
    first_name_last_initial
    __typename
  }
  task {
    ...NoteTaskFragment
    __typename
  }
  __typename
}

fragment NoteTaskFragment on Task {
  id
  completed_at
  content
  created_at
  creator {
    id
    full_name
    __typename
  }
  user {
    id
    full_name
    __typename
  }
  client {
    id
    full_name
    __typename
  }
  __typename
}

`

const GQL_UPDATE_CHAT_VIEWED = gql`mutation updateConversationMembership($id: ID, $archived: Boolean, $viewed: Boolean) {
  updateConversationMembership(input: {id: $id, archived: $archived, viewed: $viewed}) {
    conversation_membership {
      id
      viewed
      creator {
        id
        unread_convo_count
        __typename
      }
      __typename
    }
    messages {
      field
      message
      __typename
    }
    __typename
  }
}`
module.exports={
  GQL_UPDATE_CHAT_VIEWED,
  GQL_Create_Chat,
  GQL_GET_NOTES,
  GQL_Conversation_Membership,
  GQL_GET_appointmentTypesData,
  GQL_GET_ORGANIZATION,
  GQL_Delete_Appointment,
  GQL_Complete_CheckOut_Meeting_Update,
  GQL_Complete_CheckOut_Meeting,
  GQL_DAY_AVAILABLE_SLOTS,
  GQL_DAYS_AVAILABLE,
  GET_ALL_APPOINTMENTS,
  UPDATE_NOTIFICATIONS_SETTING,
  GET_NOTIFICATIONS_SETTING,
  GQL_CREATE_GOAL_HISTORY,
  GQL_DELETE_GOAL_HISTORY,
  GQL_ALL_GOALS,
  GQL_UPDATE_USER,
  GQL_FORGOT_PASSWORD,
  GQL_SIGN_IN_USER_DATA,
  GQL_zoomSdkJwt,
  GQL_SIGN_IN
}