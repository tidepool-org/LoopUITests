/**
 * @summary see https://github.com/tidepool-org/LoopKit/blob/dev/LoopKit/TherapySettings.swift#L64-L103
 */

// public static var mockTherapySettings: TherapySettings {
//     let timeZone = TimeZone(identifier: "America/Los_Angeles")!

//     let glucoseTargetRangeSchedule =  GlucoseRangeSchedule(
//         rangeSchedule: DailyQuantitySchedule(unit: .milligramsPerDeciliter,
//             dailyItems: [RepeatingScheduleValue(startTime: .hours(0), value: DoubleRange(minValue: 100.0, maxValue: 110.0)),
//                          RepeatingScheduleValue(startTime: .hours(8), value: DoubleRange(minValue: 90.0, maxValue: 100.0)),
//                          RepeatingScheduleValue(startTime: .hours(21), value: DoubleRange(minValue: 100.0, maxValue: 110.0))],
//             timeZone: timeZone)!,
//         override: GlucoseRangeSchedule.Override(value: DoubleRange(minValue: 80.0, maxValue: 90.0),
//                                                 start: Date().addingTimeInterval(.minutes(-30)),
//                                                 end: Date().addingTimeInterval(.minutes(30)))
//     )
//     let basalRateSchedule = BasalRateSchedule(
//         dailyItems: [RepeatingScheduleValue(startTime: .hours(0), value: 1),
//                      RepeatingScheduleValue(startTime: .hours(15), value: 0.85)],
//         timeZone: timeZone)!
//     let insulinSensitivitySchedule = InsulinSensitivitySchedule(
//         unit: .milligramsPerDeciliter,
//         dailyItems: [RepeatingScheduleValue(startTime: .hours(0), value: 45.0),
//                      RepeatingScheduleValue(startTime: .hours(9), value: 55.0)],
//         timeZone: timeZone)!
//     let carbRatioSchedule = CarbRatioSchedule(
//         unit: .gram(),

//         dailyItems: [RepeatingScheduleValue(startTime: .hours(0), value: 10.0)],
//         timeZone: timeZone)!

//     return TherapySettings(
//         glucoseTargetRangeSchedule: glucoseTargetRangeSchedule,
//         preMealTargetRange: DoubleRange(minValue: 80.0, maxValue: 90.0),
//         workoutTargetRange: DoubleRange(minValue: 140.0, maxValue: 160.0),
//         maximumBasalRatePerHour: 5,
//         maximumBolus: 10,
//         glucoseSafetyLimit: GlucoseThreshold(unit: .milligramsPerDeciliter, value: 75),
//         insulinSensitivitySchedule: insulinSensitivitySchedule,
//         carbRatioSchedule: carbRatioSchedule,
//         basalRateSchedule: basalRateSchedule,
//         insulinModelSettings: InsulinModelSettings(model: ExponentialInsulinModelPreset.humalogNovologAdult)
//     )
// }

module.exports = {
  insulinSensitivitySchedule: [
    { startTime: '0', value: 45 },
    { startTime: '9', value: 55 },
  ],
  glucoseTargetRangeSchedule: [
    { startTime: '0', max: 110.0, min: 100.0 },
    { startTime: '8', max: 90.0, min: 100.0 },
    { startTime: '21', max: 100.0, min: 110.0 },
  ],
  glucoseTargetRangeOverride: { max: 80.0, min: 90.0 },
  preMealTargetRange: { max: 80.0, min: 90.0 },
  workoutTargetRange: { max: 140.0, min: 160.0 },
  maximumBasalRatePerHour: 5,
  maximumBolus: 10,
  glucoseSafetyLimit: 75,
  carbRatioSchedule: [{ startTime: '0', value: 10 }],
  basalRateSchedule: [{ startTime: '0', value: 1.0 }, { startTime: '15', value: 0.85 }],
  insulinModelSettings: '',
};
